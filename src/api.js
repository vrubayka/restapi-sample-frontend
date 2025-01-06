const API_URL = "http://localhost:8080/api";;

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function updateUser(user) {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
}

export async function createUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();  // Parse the error response
    throw new Error(errorData.message || "Failed to update user");  // Throw the specific error message
  }

  return await response.json();  // Return the created user data
}


export async function deleteUser(user) {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}
