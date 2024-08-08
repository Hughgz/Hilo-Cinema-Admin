using HiloCinema_Backend.Model;

namespace HiloCinema_Backend.Dtos
{
    public class ActorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public byte[]? Img { get; set; }
        public virtual ICollection<MovieDTO> Movies { get; set; } = new List<MovieDTO>();
    }
}
