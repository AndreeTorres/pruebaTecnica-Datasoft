import apiClient from './client.js';

export async function getGenres() {
  const response = await apiClient.get('/genres');
  return response.data;
}

export async function getBooks(genreId) {
  const response = await apiClient.get('/books', {
    params: genreId ? { genreId } : {},
  });
  return response.data;
}

export async function getBookById(id) {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
}
