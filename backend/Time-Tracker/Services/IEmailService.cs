using System.Net.Mail;

namespace Time_Tracker.Services;

public interface IEmailService
{
    Task SendEmail(MailMessage mailMessage);
}
