import { API_URL, AUTH_KEY_NAME } from "../config";
import Token from "../types/Token";

export const createRequest = (query: string, authToken: Token | null) => {
  const request = {
    url: `${API_URL}/graphql`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [AUTH_KEY_NAME]: authToken ? authToken.value : null
      },
      body: {
        query: query,
      },
}
    return request; 

  };