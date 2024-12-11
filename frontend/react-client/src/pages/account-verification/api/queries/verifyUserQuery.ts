import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface VerifyUserResponse extends GraphQLResponse{
    data: {
        activateUser: string
    }
}

export const verifyUserQuery = () => `
mutation ActivateUser($input: ActivateUserInput!) {
    userMutation {
        activateUser(input: $input)
    }
}`
