using GraphQL;
using GraphQL.Types;
using System.Net.Mail;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Mutations;

public class UserMutation : ObjectGraphType
{
    public UserMutation(IUsersRepository userRepository,
        IActivationCodeRepository activationCodeRepository,
        IEmailService emailService,
        HashingService hashingService)
    {
        Field<UserGraphType>("createUser")
            .Argument<NonNullGraphType<UserInputGraphType>>("user")
            .ResolveAsync(async context =>
            {
                var userInput = context.GetArgument<User>("user");

                if (userRepository.FindByEmail(userInput.Email) is not null) throw new ExecutionError("User with this email already exists.");

                var userId = await userRepository.AddAsync(userInput);

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

        Field<StringGraphType>("activateUser")
            .Argument<NonNullGraphType<ActivateUserInputGraphType>>("input")
            .ResolveAsync(async context =>
            {
                ActivateUserDto input = context.GetArgument<ActivateUserDto>("input");

                var activationCode = await activationCodeRepository.FindByValueAsync(input.Code);

                if (activationCode == null) throw new ExecutionError("Activation code not found.");

                var user = userRepository.Find(activationCode.UserId);

                if (user == null) throw new ExecutionError("User not found.");

                user.Salt = hashingService.GenerateSalt();

                user.HashedPassword = hashingService.ComputeHash(input.Password, user.Salt);

                await userRepository.UpdateAsync(user);

                await activationCodeRepository.RemoveAsync(activationCode);

                return "User activated successfully";
            });

        Field<StringGraphType>("updateUser")
            .Argument<NonNullGraphType<UserGraphType>>("user")
            .ResolveAsync(async context =>
            {
                return "Test update user";
            });
    }
}
