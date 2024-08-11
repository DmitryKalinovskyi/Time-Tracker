using GraphQL.DataLoader;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class WorkSessionGraphType: ObjectGraphType<WorkSession>
    {
        public WorkSessionGraphType(IUsersRepository userRepository,
                                     IDataLoaderContextAccessor accessor)
        {
            Field(t => t.Id);
            Field(t => t.StartTime, nullable: true);
            Field(t => t.EndTime, nullable: true);
            Field(t => t.SessionOriginId);
            Field(t => t.Duration, nullable: true);
            Field(t => t.CreatedAt);
            Field(t => t.LastUpdatedAt);
            Field<UserGraphType, User>("user")
                .ResolveAsync(context =>
                {
                    var loader = accessor.Context?.GetOrAddBatchLoader<int, User>("GetUsersByIdAsync", userRepository.GetUsersByIdAsync);
                    return loader.LoadAsync(context.Source.UserId);
                });

            Field<UserGraphType, User>("editedBy")
                .ResolveAsync(context =>
                {
                    var editedById = context.Source.EditedBy;
                    if (editedById == null)return null;
                    
                    var loader = accessor.Context?.GetOrAddBatchLoader<int, User>("GetUsersByIdAsync", userRepository.GetUsersByIdAsync);
                    return loader.LoadAsync((int)editedById);
                });

        }
    }
}
