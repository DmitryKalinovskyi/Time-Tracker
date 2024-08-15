import User from "../../../types/User.ts";

export interface regUserQueryResponse{
    userMutation: {
        createUser: User
    }
}

export const regUserQuery = (
    fullName: string,
    email: string,
) => {
    const query = `
      mutation Registration{
              userMutation{
                createUser(user: {fullName: "${fullName}" email: "${email}"  }) {
                id
                fullName
                email
                permissions
              }
              }
          }
      `;

    return query;

}