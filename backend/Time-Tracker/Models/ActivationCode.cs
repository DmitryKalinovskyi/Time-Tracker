namespace Time_Tracker.Models;

public class ActivationCode
{
    public int Id { get; set; }
    public Guid Value { get; set; } = Guid.NewGuid();
    public int UserId { get; set; }
}
