import User from "../../app/types/User.ts";
import Token from "../../app/types/Token.ts";
export interface authUserQueryResponse {
  identityQuery: {
    login: {
      accessToken: Token,
    }
  }
}

export interface regUserQueryResponse {
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
                      }, userId
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


export const getUsersQuery = () => {
  const query = `
  query usersQuery($first: Int, $after: String, $last: Int, $before: String){
  usersQuery {
    users(first: $first, after: $after, last: $last, before: $before) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          fullName
          email
          permissions
          isActive
        }
      }
    }
  }
}
`;
  return query;
}

export const getUserQuery = () => {
  const query = `
  query usersQuery($userId: Int!){
  usersQuery {
    user(userId: $userId) {
      id
      fullName
      email
      permissions
      isActive
    }
  }
}
`;
  return query;
}

export const updateUserMutation = () => {
  const query = `
  mutation userMutation($id: Int!, $fullName: String!, $email: String!){
  userMutation {
    updateUser(user: { id: $id, fullName: $fullName, email: $email })
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
