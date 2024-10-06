import Token from "../../../types/Token.ts";
import User from "../../../types/User.ts";
import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";

export interface LoginQueryResponseType {
    errors?: GraphQLExecutionErrorType[]
    data:{
        identityMutation: {
            login: {
                user: User,
                accessToken: Token,
                refreshToken: Token
            }
        }
    }
}

export interface RefreshTokenQueryResponseType {
    errors?: GraphQLExecutionErrorType[]
    data:{
        identityMutation:{
            refreshToken:{
                user: User,
                accessToken: Token,
                refreshToken: Token
            }
        }
    }
}


export const loginQuery = () =>
`
mutation Login($input: LoginInput!){
  identityMutation{
    login(input: $input){
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
        permissions,
        calendarEvents{
          id,
          startTime,
          endTime
        }
      }
    }
  }
}`;

export const refreshTokenQuery = () =>
    `
    mutation RefreshToken($input: RefreshTokenRequest!){
  identityMutation{
    refreshToken(input: $input){
      user{
        id,
        fullName,
        email,
        permissions,
        calendarEvents{
            id,
            startTime,
            endTime
        }
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