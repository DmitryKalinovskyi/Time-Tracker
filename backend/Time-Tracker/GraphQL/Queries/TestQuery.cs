using GraphQL;
using GraphQL.Types;

namespace Time_Tracker.GraphQL.Queries
{
    public class TestQuery: ObjectGraphType
    {
        public TestQuery()
        {
            Field<StringGraphType>("name").Resolve(context =>
            {
                return "Hello!";
            });
        }
    }
}
