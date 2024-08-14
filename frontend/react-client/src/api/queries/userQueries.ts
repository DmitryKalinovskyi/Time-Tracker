import User from "../../app/types/User.ts";
import Token from "../../app/types/Token.ts";
export interface authUserQueryResponse{
  identityMutation: {
    login: {
      accessToken: Token,
      user: User
    }
  }
}

export interface regUserQueryResponse{
  userMutation: {
    createUser: User
  }
}

export const authUserQuery = (
    email: string, 
    password: string, 
  ) => {
    const query = `
      mutation Login{
                  identityMutation{
                    login(input: {email: "${email}", password: "${password}"}){
                      accessToken{
                       value,
                       dateIssued,
                       dateExpires
                      },
                      user{
                      id,
                      fullName,
                      email,
                      permissions
                      }
                    }
                }
            }
    `;
  
    return query;
};


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

export const verifUserQuery = (
  code: string,
  password: string
) => {
  const query = `
    mutation ActivateUser {
        userMutation {
            activateUser(input: {code: "${code}", password: "${password}"})
        }
    }
`;
  return query;
}

export const resetUserPasswordQuery = (
    email: string
) => {
  const query = `
    mutation ResetPassword {
      userMutation {
        resetPassword(user: { email: "${email}" })
      }
    }
`;
  return query;
}

            