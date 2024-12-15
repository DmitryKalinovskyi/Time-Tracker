import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface ResetPasswordResponse extends GraphQLResponse{
    data: {
        userMutation: {
            resetPassword: string
        }
    }
}

export const resetPasswordQuery = () => `
mutation ResetPassword($input: ResetPasswordInput!){
  userMutation{
    resetPassword(user: $input)
  }
}`



