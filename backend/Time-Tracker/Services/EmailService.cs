using System.Net.Mail;
using System.Net;

namespace Time_Tracker.Services;

public class EmailService : IEmailService
{
    private readonly string _userName;
    private readonly string _password;
    private readonly string _host;
    public EmailService(IConfiguration configuration)
    {
        _userName = configuration["Email:Username"]
                ?? throw new Exception("Email username is not specified.");
        _password = configuration["Email:Password"]
                ?? throw new Exception("Password username is not specified.");
        _host = configuration["Email:Host"]
                ?? throw new Exception("Host username is not specified.");
    }
    public async Task SendEmail(MailMessage mailMessage)
    {
        mailMessage.From = new MailAddress(_userName);

        var smtpClient = new SmtpClient(_host)
        {
            Port = 587,
            Credentials = new NetworkCredential(_userName, _password),
            EnableSsl = true,
        };

        smtpClient.UseDefaultCredentials = false;

        await smtpClient.SendMailAsync(mailMessage);
    }
}
