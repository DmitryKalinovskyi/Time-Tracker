import {API_URL} from "@time-tracker/shared/config/config.ts";
import {store} from "../../store.ts";
import {AuthType} from "@time-tracker/features/authentification/authSlice.ts";

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