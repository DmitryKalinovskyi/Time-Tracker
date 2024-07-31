using GraphQL;
using GraphQL.Types;
using System.Net.Mail;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Mutations;

public class UserMutation : ObjectGraphType
{
    public UserMutation(IUsersRepository userRepository,
        IActivationCodeRepository activationCodeRepository,
        IEmailService emailService)
    {
        Field<UserGraphType>("createUser")
            .Argument<NonNullGraphType<UserInputGraphType>>("user")
            .ResolveAsync(async context =>
            {
                var userId = await userRepository.AddAsync(context.GetArgument<User>("user"));

                var code = new ActivationCode()
                {
                    UserId = userId
                };

                _ = await activationCodeRepository.AddAsync(code);

                var user = userRepository.Find(userId);

                if (user == null) throw new ExecutionError("User not found.");

                MailMessage message = new MailMessage();
                message.To.Add(user.Email);
                message.Subject = "TimeTracker activation code";
                message.Body = @$"TimeTracker activation code for your account: {code.Value}";

                await emailService.SendEmail(message);

                return user;
            });
    }
}
