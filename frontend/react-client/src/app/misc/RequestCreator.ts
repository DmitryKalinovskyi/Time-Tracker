import {API_URL, ACCESS_TOKEN_KEY_NAME} from "../config";
import Token from "../types/Token.ts";

function getAccessToken() {
  const accessToken: Token | null = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY_NAME) ?? "null");
  return accessToken?.value ?? "";
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