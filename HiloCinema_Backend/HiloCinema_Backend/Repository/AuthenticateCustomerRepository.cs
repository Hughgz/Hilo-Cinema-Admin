using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Helper;
using HiloCinema_Backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace HiloCinema_Backend.Repository
{
    public class AuthenticateCustomerRepository : IAuthenticateCustomerRepository
    {
        private readonly HiloCinemaContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public AuthenticateCustomerRepository(HiloCinemaContext context, IConfiguration configuration, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _configuration = configuration;
            _jwtSettings = jwtSettings.Value;
        }

        public bool IsEmailExist(string email)
        {
            return _context.Customers.Any(c => c.Email == email);
        }

        public void Register(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }

        public async Task<Customer> GetCustomerByEmail(string email)
        {
            var customer = _context.Customers.SingleOrDefault(c => c.Email == email);
            if (customer == null)
            {
                throw new Exception("Customer not found");
            }
            return customer;
        }

        public string GenerateJwtToken(Customer customer)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", customer.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public void UpdateCustomer(Customer customer)
        {
            _context.Customers.Update(customer);
            _context.SaveChanges();
        }

        public string Login(LoginDTO loginDTO)
        {
            var user = _context.Customers.SingleOrDefault(x => x.Email == loginDTO.Email);

            // return null if user not found or password is incorrect
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password)) return null;

            var token = GenerateJwtToken(user);

            // Update customer with new token
            user.Token = token;
            UpdateCustomer(user);

            return token;
        }

        public Customer GetById(int id)
        {
            return _context.Customers.FirstOrDefault(x => x.Id == id);
        }

        public void SaveChangesAsync()
        {
            _context.SaveChanges();
        }
        public void InvalidateToken(Customer customer)
        {
            customer.Token = null;
            UpdateCustomer(customer);
        }
        public async Task<bool> ForgotPasswordAsync(string email)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(u => u.Email == email);
            if (customer == null) return false;

            var token = Guid.NewGuid().ToString(); // Generate token
            customer.Token = token;
            await _context.SaveChangesAsync();

            var resetLink = $"{_configuration["AppUrl"]}/reset-password?token={token}";

            var message = new MailMessage();
            message.To.Add(new MailAddress(email));
            message.Subject = "Reset Password";
            message.Body = $"Click on this link to reset your password: {resetLink}";
            message.IsBodyHtml = true;

            using (var smtp = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"])))
            {
                smtp.Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]);
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(message);
            }

            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(u => u.Token == token);
            if (customer == null) return false;

            customer.Password = BCrypt.Net.BCrypt.HashPassword(newPassword); // Hash the password before storing
            customer.Token = null;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
