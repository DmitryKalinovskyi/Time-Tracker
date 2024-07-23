using GraphQL.Types;
using Time_Tracker.GraphQL.Queries;

namespace Time_Tracker.GraphQL.Schemas
{
    public class RootSchema: Schema
    {
        public RootSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
        }
    }
}
