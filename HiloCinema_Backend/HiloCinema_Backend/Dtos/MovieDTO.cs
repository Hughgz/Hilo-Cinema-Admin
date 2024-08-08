using HiloCinema_Backend.Model;

namespace HiloCinema_Backend.Dtos
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Duration { get; set; }
        public DateOnly? ReleasedDate { get; set; }
        public double? Rate { get; set; }
        public string? Country { get; set; }
        public string Director { get; set; } = null!;
        public string Description { get; set; } = null!;
        public byte[]? ImgSmall { get; set; }
        public byte[]? ImgLarge { get; set; }
        public string? MovieType { get; set; }
        public string? Trailer { get; set; }
        public string? Status { get; set; }
    }
}
