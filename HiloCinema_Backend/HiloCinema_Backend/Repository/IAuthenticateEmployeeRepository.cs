using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Model;

namespace HiloCinema_Backend.Repository
{
    public interface IAuthenticateEmployeeRepository
    {
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPassword);
        bool IsEmailExist(string email);
        void Register(Employee employee);
        Task<Employee> GetEmployeeByEmail(string email);
        string Login(LoginDTO loginDTO);
        Employee GetById(int id);
        string GenerateJwtToken(Employee employee);
        void UpdateEmployee(Employee employee);
        void InvalidateToken(Employee employee);
        void SaveChangesAsync();
    }
}
