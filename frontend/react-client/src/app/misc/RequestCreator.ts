import {API_URL, AUTH_KEY_NAME} from "../config";
import {AuthType} from "../features/authentification/authSlice.ts";

function getAccessToken() {
  const auth: AuthType = JSON.parse(localStorage.getItem(AUTH_KEY_NAME));
  return auth.accessToken?.value ?? "";
}

export const createQuery = (query: string, variables: object = {}) => ({
  url: `${API_URL}/graphql`,
  method: 'POST',
  headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
  },
  body: {
    query,
    variables
  }
});


export const createMutation = (mutation: string, variables: object = {}) => ({
  url: `${API_URL}/graphql`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`
  },
  body: {
    mutation,
    variables
  }
});