﻿using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class UpdateUserInputGraphType : InputObjectGraphType
    {

        public UpdateUserInputGraphType()
        {
            Field<NonNullGraphType<IntGraphType>>("id");
            Field<StringGraphType>("fullName");
            Field<StringGraphType>("email");
            Field<IntGraphType>("roleId");
        }
    }
}
