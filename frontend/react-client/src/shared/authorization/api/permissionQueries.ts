import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface GetPermissionsQueryResponse extends GraphQLResponse{
    data: {
        permissionsQuery: {
            availablePermissions: string[]
        }
    }
}
export const getPermissionsQuery = () =>
`
query GetPermissionsQuery{
  permissionsQuery {
    availablePermissions
  }
}`;
