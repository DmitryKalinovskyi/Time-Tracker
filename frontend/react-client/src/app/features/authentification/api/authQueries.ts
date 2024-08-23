import Token from "../../../types/Token.ts";
import User from "../../../types/User.ts";

export interface authUserQueryResponse{
    identityMutation: {
        login: {
            user: User,
            accessToken: Token,
            refreshToken: Token
        }
    }
}

export interface refreshTokenQueryResponse{
    errors?: []
    identityMutation:{
        refreshToken:{
            user: User,
            accessToken: Token,
            refreshToken: Token
        }
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
                      refreshToken{
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

export const refreshTokenQuery = () =>
    `
    mutation RefreshToken($input: RefreshTokenRequest!){
  identityMutation{
    refreshToken(input: $input){
      user{
        id,
        fullName,
        email,
        permissions
      },
      accessToken{
        value,
        dateIssued,
        dateExpires
      },
      refreshToken{
        value,
        dateIssued,
        dateExpires
      }
    }
  }
}
    `

export const logoutQuery =() => `
mutation Logout{
  identityMutation{
    logout
  }
}
`