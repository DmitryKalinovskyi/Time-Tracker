import User from "@time-tracker/types/User.ts";
import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface RegisterUserQueryResponse extends GraphQLResponse {
    data:{
        userMutation: {
            createUser: User
        }
    }
}

export const registerUserQuery = () =>
`
mutation Registration($input: CreateUserInput!){
    userMutation{
      createUser(user: $input) {
        id
        fullName
        email
        permissions
      }
    }
}
`;
