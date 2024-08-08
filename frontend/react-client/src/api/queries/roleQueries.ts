import Role from "../../app/types/Role.ts";

export interface getRolesResponse{
    rolesQuery:{
        roles: Role[]
    }
}

export const getRolesQuery = () => `
query GetRoles{
  rolesQuery{
    roles{
      id,
      name,
      permissions
    }
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

export const createRoleQuery = (role: Role
) => `
    mutation CreateRole{
      rolesMutation{
        createRole(role: {
          name: "${role.name}",
          permissions: [${role.permissions}]
        }){
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

export const updateRoleQuery = (role: Role
) => `
    mutation UpdateRole{
      rolesMutation{
          updateRole(role:{
            id: ${role.id},
            name: "${role.name}",
            permissions: [${role.permissions}]
          }){
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


