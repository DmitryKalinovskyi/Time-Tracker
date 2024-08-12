using GraphQL.Types;
using Time_Tracker.Models;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class SessionOriginGraphType: ObjectGraphType<SessionOrigin>
    {
        public SessionOriginGraphType()
        {
            Field(t => t.Id);
            Field(t => t.OriginName);
            Field(t => t.Description, nullable: true);
        }
    }
}
