using GraphQL.Types;
using Time_Tracker.Models;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class StartSessionResponseGraphType: ObjectGraphType<WorkSession>
    {
        public StartSessionResponseGraphType() 
        {
            Field(t => t.Id);
            Field(t => t.StartTime, nullable: true);
        }
    }
}
