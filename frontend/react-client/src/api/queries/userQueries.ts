import User from "../../app/types/User.ts";

export interface authUserQueryResponse {
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
    password: string
) => {
  const query = `
    query Login {
      identityQuery {
        login(input: {email: "${email}", password: "${password}"}) {
          accessToken {
            value,
            dateIssued,
            dateExpires
          },
          user {
            fullName,
            email,
            role {
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

export interface createUserQueryResponse {
  userMutation: {
    createUser: User;
  };
}

export const createUserQuery = (user: User) => {
  const query = `
    mutation {
      userMutation {
        createUser(user: {
          fullName: "${user.fullName}",
          email: "${user.email}"
        }) {
          id
          fullName
          email
        }
      }
    }
  `;
  return {
    query,
    variables: {}
  };
};

export const verifyUserQuery = (input: { code: string; password: string }) => {
  const query = `
    mutation {
      userMutation {
        activateUser(input: {
          code: "${input.code}",
          password: "${input.password}"
        })
      }
    }
  `;
  return {
    query,
    variables: {}
  };
};