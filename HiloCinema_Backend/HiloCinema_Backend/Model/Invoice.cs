using System;
using System.Collections.Generic;

namespace HiloCinema_Backend.Model;

public partial class Invoice
{
    public int Id { get; set; }

    public int ScheduleId { get; set; }

    public int EmployeeId { get; set; }

    public int CustomerId { get; set; }

    public int? PromotionId { get; set; }

    public string? PaymentMethod { get; set; }

    public int? Total { get; set; }

    public string? Status { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<InvoiceFood> InvoiceFoods { get; set; } = new List<InvoiceFood>();

    public virtual Promotion? Promotion { get; set; }

    public virtual Schedule Schedule { get; set; } = null!;
}
