import User from "@time-tracker/types/User.ts";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export interface UsersByEmailOrFullNameResponse{
    data: {
        usersQuery:{
            usersByEmailOrFullName: User[]
        }
    },
    errors?: GraphQLExecutionErrorType[]
}

export const usersByEmailOrFullNameQuery = () => `
query UsersByEmailOrFullName($input: UsersByEmailOrFullNameRequest!){
  usersQuery{
    usersByEmailOrFullName(input: $input){
      id,
      fullName,
      email,
    }
  }
}
`
