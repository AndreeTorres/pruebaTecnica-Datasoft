import apiClient from './client.js';

export async function loginUser(credentials) {
  const response = await apiClient.post('/login', credentials);
  return response.data;
}
