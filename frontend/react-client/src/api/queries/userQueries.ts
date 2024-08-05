import User from "../../app/types/User.ts";

export interface authUserQueryResponse{
  identityQuery: {
    login: {
      accessToken: {
        value: string,
        dateIssued: string,
        dateExpires: string
      },
      user: User
    }
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


            