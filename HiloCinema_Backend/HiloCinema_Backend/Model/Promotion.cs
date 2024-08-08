using System;
using System.Collections.Generic;

namespace HiloCinema_Backend.Model;

public partial class Promotion
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public int? Value { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? DueDate { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
