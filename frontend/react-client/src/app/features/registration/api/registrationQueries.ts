import User from "../../../types/User.ts";

export interface RegisterUserQueryResponse {
    errors?: [],
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
