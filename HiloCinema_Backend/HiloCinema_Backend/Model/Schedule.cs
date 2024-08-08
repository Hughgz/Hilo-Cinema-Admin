using System;
using System.Collections.Generic;

namespace HiloCinema_Backend.Model;

public partial class Schedule
{
    public int Id { get; set; }

    public int MovieId { get; set; }

    public DateOnly? Date { get; set; }

    public TimeOnly? Time { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public virtual Movie Movie { get; set; } = null!;

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}
