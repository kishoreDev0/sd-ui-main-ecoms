import axios, { AxiosInstance } from 'axios';

export interface HttpClientInstance {
  httpClient: AxiosInstance;
}

export const initializeHttpClient = (): HttpClientInstance => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user')
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      'user-id' : userId,
      'access-token' : token
      
    },
  });

  return { httpClient };
};
