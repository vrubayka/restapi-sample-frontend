import { useState, useEffect } from "react";
import { fetchUsers, updateUser, deleteUser, createUser } from "./api";

function EditableUserTable() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", name: "" });

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value; // Update the specific field
    setUsers(updatedUsers);
  };

  // Handle input changes for the new user form
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Update handleCreateUser to call the correct API method
  const handleCreateUser = async () => {
    try {
      const data = await createUser(newUser); // Call the API method for creating user
      setUsers((prevUsers) => [...prevUsers, data]); // Add the new user to the list
      setNewUser({ name: "", email: "" }); // Clear the input fields
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);  // Display the specific error message
    }
  };
  

  const handleSave = async (user) => {
    try {
      await updateUser(user); // Send updated user to the backend
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user);
      // Update the state to remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

      alert("User deleted succesfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div>
      <h1>Smeshariki Database</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleSave(user)}>Save changes</button>
                <button onClick={() => handleDelete(user)}>Delete User</button>
              </td>
            </tr>
          ))}
          {/* New user row */}
          <tr>
            <td>New</td>
            <td>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleNewUserChange}
                placeholder="Name"
              />
            </td>
            <td>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                placeholder="Email"
              />
            </td>
            <td>
              <button onClick={handleCreateUser}>Save New User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditableUserTable;
