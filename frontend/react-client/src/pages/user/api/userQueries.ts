export const getUserQuery = () => {
    const query = `
    query GetUserQuery($userId: Int!){
    usersQuery {
      user(userId: $userId) {
        id,
        fullName,
        permissions,
        email,
        position,
        workHoursPerMonth
      }
    }
  }
  `;
    return query;
  }

  export const updateUserMutation = () => {
    const query = `
    mutation userMutation($id: Int!, $fullName: String!, $email: String!, $position: String!, $workHoursPerMonth: Int!){
    userMutation {
      updateUser(user: { id: $id, fullName: $fullName, email: $email, position: $position, workHoursPerMonth: $workHoursPerMonth })
    }
  }
  `;
    return query;
  }
  
  export const updateUserActiveStatusMutation = () => {
    const query = `
    mutation userMutation($id: Int!, $isActive: Boolean!){
    userMutation {
      updateUserActiveSatus(id: $id, isActive: $isActive)
    }
  }
  `;
    return query;
  }

  export const updateUserPermissionsMutation = () => {
    const query = `
    mutation userMutation($id: Int!, $permissions: [String]){
    userMutation {
      updateUserPermissions(user: { id: $id, permissions: $permissions })
    }
  }
  `;
    return query;
  }