namespace HiloCinema_Backend.Dtos
{
    public class RegisterDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateOnly Birthdate { get; set; }
        public string Password { get; set; }
        public DateOnly Created_Date { get; set; }
    }
}
