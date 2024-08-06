import User from "../../app/types/User.ts";
import Token from "../../app/types/Token.ts";
export interface authUserQueryResponse{
  identityQuery: {
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
      query Login{
                  identityQuery{
                    login(input: {email: "${email}", password: "${password}"}){
                      accessToken{
                       value,
                       dateIssued,
                       dateExpires
                      },
                      user{
                        fullName,
                        email,
                        role{
                          id,
                          name,
                          permissions
                        }
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
                roleId
                role {
                  id
                  name
                  permissions
                }
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
            activateUser(input: {code: "${code}" password: "${password}"})
        }
    }
`;
  return query;
}

            