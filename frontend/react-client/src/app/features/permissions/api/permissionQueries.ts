
export interface GetPermissionsQueryResponse{
    errors?: [],
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
