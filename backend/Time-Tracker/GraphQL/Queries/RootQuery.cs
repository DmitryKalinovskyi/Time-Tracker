using GraphQL.Types;

namespace Time_Tracker.GraphQL.Queries
{
    public class RootQuery: ObjectGraphType
    {
        public RootQuery()
        {
            Field<TestQuery>("testQuery").Resolve(context => new { });
        }
    }
}
