using System;
using System.Collections.Generic;

namespace HiloCinema_Backend.Model;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
