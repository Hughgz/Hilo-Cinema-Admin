using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Helper;
using HiloCinema_Backend.Model;
using HiloCinema_Backend.Repository;
using HiloCinema_Backend.Requests;
using Microsoft.AspNetCore.Mvc;

namespace HiloCinema_Backend.Controllers
{
    [Route("api/Authentication")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticateEmployeeRepository _empRepository;
        private readonly IAuthenticateCustomerRepository _cusRepository;

        public AuthenticateController(IAuthenticateEmployeeRepository empRepository, IAuthenticateCustomerRepository cusRepository)
        {
            _cusRepository = cusRepository;
            _empRepository = empRepository;
        }

        [HttpPost("customer/register")]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            try
            {
                if (_cusRepository.IsEmailExist(model.Email))
                    return BadRequest("Email already in use");

                var customer = new Customer
                {
                    Name = model.Name,
                    Email = model.Email,
                    Phone = model.Phone,
                    Gender = model.Gender,
                    Birthdate = model.Birthdate,
                    Password = PasswordHasher.HashPassword(model.Password),
                    CreatedDate = DateTime.Now
                };

                _cusRepository.Register(customer);

                return Ok(new { message = "Register successfully" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("employee/register")]
        public async Task<IActionResult> RegisterEmployee(RegisterEmployeeDTO model)
        {
            try
            {
                if (_empRepository.IsEmailExist(model.Email))
                    return BadRequest("Email already in use");

                var employee = new Employee
                {
                    Name = model.Name,
                    Email = model.Email,
                    Phone = model.Phone,
                    Address = model.Address,
                    Gender = model.Gender,
                    Birthdate = model.Birthdate,
                    Position = model.Position,
                    SysRole = model.Sys_Role,
                    Password = PasswordHasher.HashPassword(model.Password),
                    CreatedDate = DateTime.UtcNow,
                    Status = model.Status
                };

                _empRepository.Register(employee);

                return Ok(new { message = "Register successfully" });
            }
            catch (Exception e)
            {
                var innerException = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest($"Error occurred while registering employee: {innerException}");
            }
        }


        [HttpPost("customer/login")]
        public async Task<IActionResult> Authenticate(LoginDTO model)
        {
            var customer = await _cusRepository.GetCustomerByEmail(model.Email);

            if (customer == null || !PasswordHasher.VerifyPassword(customer.Password, model.Password))
                return BadRequest(new { message = "Email hoặc mật khẩu không chính xác" });


            var token = _cusRepository.GenerateJwtToken(customer);

            customer.Token = token;
            _cusRepository.UpdateCustomer(customer);

            return Ok(new { token });
        }
        [HttpPost("employee/login")]
        public async Task<IActionResult> AuthenticateEmployee(LoginDTO model)
        {
            var employee = await _empRepository.GetEmployeeByEmail(model.Email);

            if (employee == null || !PasswordHasher.VerifyPassword(employee.Password, model.Password))
                return BadRequest(new { message = "Email hoặc mật khẩu không chính xác" });

            var token = _empRepository.GenerateJwtToken(employee);

            employee.Token = token;
            _empRepository.UpdateEmployee(employee);

            // Trả về thông tin employee cùng với token
            return Ok(new { token, user = employee });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
        {
            var result = await _cusRepository.ForgotPasswordAsync(model.Email) || await _empRepository.ForgotPasswordAsync(model.Email);
            if (!result)
                return BadRequest(new { message = "Error sending email. Please try again." });

            return Ok(new { message = "Password reset email has been sent." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {
            var result = await _cusRepository.ResetPasswordAsync(model.Token, model.NewPassword) || await _empRepository.ResetPasswordAsync(model.Token, model.NewPassword);
            if (!result)
                return BadRequest(new { message = "Error resetting password. Please try again." });

            return Ok(new { message = "Password has been reset." });
        }

        /*[HttpPost("customer/logout")]
        public async Task<IActionResult> LogoutCustomer(LogoutDTO model)
        {
            var customer = await _repository.GetCustomerByEmail(model.Email);

            if (customer == null)
                return BadRequest(new { message = "Invalid email" });

            // Invalidate the token
            _repository.InvalidateToken(customer);

            return Ok(new { message = "Logout successful" });
        }*/
        /* [HttpPost("employee/logout")]
         public async Task<IActionResult> LogoutEmployee(LogoutDTO model)
         {
             var employee = await _empRepository.GetEmployeeByEmail(model.Email);

             if (employee == null)
                 return BadRequest(new { message = "Invalid email" });

             // Invalidate the token
             _empRepository.InvalidateToken(employee);

             return Ok(new { message = "Logout successful" });
         }*/
    }  
}
