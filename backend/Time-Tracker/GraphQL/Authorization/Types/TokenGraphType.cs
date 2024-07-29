using GraphQL.Types;
using GraphQLParser;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class TokenGraphType : ObjectGraphType<TokenDto>
{
    public TokenGraphType()
    {
        Field(t => t.Value, nullable: false);
        Field(t => t.DateIssued, nullable: false);
        Field(t => t.DateExpires, nullable: false);
    }
}