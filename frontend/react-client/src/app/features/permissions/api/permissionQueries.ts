export const getPermissionsQuery = () => {
    const query = `
    query {
  permissionsQuery {
    availablePermissions
  }
}
  `;
    return query;
  }