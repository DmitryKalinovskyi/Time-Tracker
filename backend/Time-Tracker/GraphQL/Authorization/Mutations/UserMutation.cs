using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Mutations;

public class UserMutation : ObjectGraphType
{
    public UserMutation(IUsersRepository userRepository, IActivationCodeRepository activationCodeRepository)
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

                return userRepository.Find(userId);
            });
    }
}
