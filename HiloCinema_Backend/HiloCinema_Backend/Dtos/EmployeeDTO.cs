namespace HiloCinema_Backend.Dtos
{
    public class EmployeeDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Address { get; set; }

        public string Phone { get; set; } = null!;

        public string? Gender { get; set; }

        public DateTime? Birthdate { get; set; }

        public string? Password { get; set; }

        public string? Position { get; set; }

        public string? SysRole { get; set; }

        public string? Token { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string? Status { get; set; }

    }
}
