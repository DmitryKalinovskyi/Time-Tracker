import { API_URL } from "../config";

export const createRequest = (query: string) => {
  const request = {
    url: `${API_URL}/graphql`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        query: query,
      },
}
    return request; 

  };