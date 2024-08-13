import {API_URL} from "../config";
import {store} from "../store.ts";
import {AuthType} from "../features/authentification/authSlice.ts";

function getAccessToken() {
  const authState: AuthType = store.getState().auth;

  return authState.accessToken?.value ?? "";
}
export const createRequest = (query: string, variables: object = {}) => ({
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