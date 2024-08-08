using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace HiloCinema_Backend.Dtos
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
