using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Model;

namespace HiloCinema_Backend.Repository
{
    public interface IAuthenticateCustomerRepository
    {
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPassword);
        bool IsEmailExist(string email);
        void Register(Customer customer);
        Task<Customer> GetCustomerByEmail(string email);
        string Login(LoginDTO loginDTO);
        Customer GetById(int id);
        string GenerateJwtToken(Customer customer);
        void UpdateCustomer(Customer customer);
        void InvalidateToken(Customer customer);
        void SaveChangesAsync();
    }
}
