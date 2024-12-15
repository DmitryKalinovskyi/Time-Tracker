import Token from "../../../types/Token.ts";
import User from "../../../types/User.ts";
import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface LoginQueryResponseType extends GraphQLResponse {
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

export interface RefreshTokenQueryResponseType extends GraphQLResponse{
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