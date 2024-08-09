using System.Net.Mail;
using Time_Tracker.Models;
using Time_Tracker.Services.Mail;

namespace Time_Tracker.Services;

public class EmailSender
{
    private readonly string _senderUserName;
    private readonly IEmailService _emailService;
    public EmailSender(IEmailService emailService, IConfiguration configuration)
    {
        _emailService = emailService;

        _senderUserName = configuration["Email:Username"]
                ?? throw new Exception("Email username is not specified.");
    }

    public async Task SendActivationCodeAsync(string userEmail, string codeValue)
    {
        MailMessageBuilder builder = new MailMessageBuilder();

        var message = builder.From(this._senderUserName)
            .To(userEmail)
            .Subject("TimeTracker activation code")
            .Body(@$"TimeTracker activation code for your account: {codeValue}")
            .Build();

        await this._emailService.SendEmail(message);
    }
}
