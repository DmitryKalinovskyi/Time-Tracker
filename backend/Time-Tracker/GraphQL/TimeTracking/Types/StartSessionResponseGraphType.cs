using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.Models;
using static Time_Tracker.Repositories.IWorkSessionRepository;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class StartSessionResponseGraphType: ObjectGraphType<WorkSessionInsertResult>
    {
        public StartSessionResponseGraphType() 
        {
            Field(t => t.Id);
            Field(t => t.StartTime, nullable: true);
            Field(t => t.EndTime, nullable: true);
        }
    }
}
