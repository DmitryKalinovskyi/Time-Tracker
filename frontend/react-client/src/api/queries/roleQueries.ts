import Role from "../../app/types/Role.ts";

export interface getRolesAndPermissionsResponse{
    rolesQuery:{
        roles: Role[]
    },
    permissionsQuery: {
        availablePermissions: string[]
    }
}

export const getRolesAndPermissionsQuery = () => `
query GetRolesAndPermissions{
  rolesQuery{
    roles{
      id,
      name,
      permissions
    }
  },
  permissionsQuery{
    availablePermissions
  }
}`

export interface createRoleResponse{
    rolesMutation: {
        createRole: {
            id: number,
            name: string,
            permissions: string[]
        }
    }
}

export const createRoleQuery =
() => `
mutation CreateRole($role: CreateRoleInputType!){
  rolesMutation{
    createRole(role: $role){
      id,
      name,
      permissions
    }
  }
}
`;

export interface updateRoleResponse{
    rolesMutation: {
        updateRole: {
            id: number,
            name: string,
            permissions: string[]
        }
    }
}

export const updateRoleQuery = () => `
  mutation UpdateRole($role: UpdateRoleInput!){
      rolesMutation{
          updateRole(role: $role){
            id,
            name,
            permissions
          }
      }
    }
    `;

export interface deleteRoleResponse{
    rolesMutation: {
        deleteRole: string
    }
}

export const deleteRoleQuery = (id: number
) => `
    mutation DeleteRole{
        rolesMutation{
          deleteRole(id: ${id})
        }
    }
    `;


