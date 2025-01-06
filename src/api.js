const API_URL = 'http://localhost:8080/api';

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
