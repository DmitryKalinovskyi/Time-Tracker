using System.Net.Mail;

namespace Time_Tracker.Services.Mail;

public class MailMessageBuilder
{
    private MailMessage MailMessage { get; set; }

    public MailMessageBuilder() {
        MailMessage = new MailMessage();
    }

    public MailMessageBuilder To(string emails)
    {
        this.MailMessage.To.Add(emails);

        return this;
    }

    public MailMessageBuilder From(string userName)
    {
        this.MailMessage.From = new MailAddress(userName);

        return this;
    }

    public MailMessageBuilder Subject(string subject)
    {
        this.MailMessage.Subject = subject;

        return this;
    }

    public MailMessageBuilder BodyHtml(bool isBodyHtml = true)
    {
        this.MailMessage.IsBodyHtml = isBodyHtml;

        return this;
    }

    public MailMessageBuilder Body(string body)
    {
        this.MailMessage.Body = body;

        return this;
    }

    public MailMessageBuilder Reset()
    {
        this.MailMessage = new MailMessage();

        return this;
    }

    public MailMessage Build()
    {
        return this.MailMessage;
    }
}
