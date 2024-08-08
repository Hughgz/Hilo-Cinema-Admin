using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Helper;
using HiloCinema_Backend.Model;
using Microsoft.CodeAnalysis.Scripting;
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
    public class AuthenticateEmployeeRepository : IAuthenticateEmployeeRepository
    {
        private readonly HiloCinemaContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public AuthenticateEmployeeRepository(HiloCinemaContext context, IConfiguration configuration, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _configuration = configuration;
            _jwtSettings = jwtSettings.Value;
        }
        public bool IsEmailExist(string email)
        {
            return _context.Employees.Any(c => c.Email == email);
        }

        public void Register(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            var employee = _context.Employees.SingleOrDefault(c => c.Email == email);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            return employee;
        }

        public string GenerateJwtToken(Employee employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", employee.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public void UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            _context.SaveChanges();
        }

        public string Login(LoginDTO loginDTO)
        {
            var employee = _context.Employees.SingleOrDefault(x => x.Email == loginDTO.Email);

            // return null if user not found or password is incorrect
            if (employee == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, employee.Password)) return null;

            var token = GenerateJwtToken(employee);

            // Update customer with new token
            employee.Token = token;
            UpdateEmployee(employee);

            return token;
        }

        public Employee GetById(int id)
        {
            return _context.Employees.FirstOrDefault(x => x.Id == id);
        }

        public void SaveChangesAsync()
        {
            _context.SaveChanges();
        }
        public void InvalidateToken(Employee employee)
        {
            employee.Token = null;
            UpdateEmployee(employee);
        }
         public async Task<bool> ForgotPasswordAsync(string email)
    {
        var employee = await _context.Employees.FirstOrDefaultAsync(u => u.Email == email);
        if (employee == null) return false;

        var token = Guid.NewGuid().ToString(); // Generate token
        employee.Token = token;
        await _context.SaveChangesAsync();

        var resetLink = $"{_configuration["AppUrl"]}/reset-password?token={token}";

        var message = new MailMessage();
        message.From = new MailAddress(_configuration["Smtp:Username"]);
        message.To.Add(new MailAddress(email));
        message.Subject = "Reset Password";
        message.Body = $@"
        <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;'>
            <div style='background-color: #4CAF50; padding: 20px; text-align: center; color: #fff;'>
                <h1 style='margin: 0; font-size: 24px;'>HILO Cinema kính chào quý khách</h1>
            </div>
            <div style='padding: 30px; background-color: #f7f7f7;'>
                <p style='font-size: 18px; margin: 0 0 20px 0;'>Hi there,</p>
                <p style='margin: 0 0 20px 0;'>You requested to reset your password. Click the link below to reset it:</p>
                <p style='text-align: center;'>
                    <a href='{resetLink}' style='display: inline-block; background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;'>Reset Password</a>
                </p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>Thanks,</p>
                <p>The HiloCinema Team</p>
            </div>
            <div style='background-color: #4CAF50; padding: 10px; text-align: center; color: #fff; font-size: 14px;'>
                <p style='margin: 0;'>Need help? Contact our <a href='mailto:support@hilocinema.com' style='color: #fff; text-decoration: underline;'>support team</a>.</p>
            </div>
        </div>";
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
        var employee = await _context.Employees.FirstOrDefaultAsync(u => u.Token == token);
        if (employee == null) return false;

        employee.Password = BCrypt.Net.BCrypt.HashPassword(newPassword); // Hash the password before storing
        employee.Token = null;
        await _context.SaveChangesAsync();

        return true;
    }
    }
}
