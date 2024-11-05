import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userID) => {
    await axios.delete(`http://localhost:5000/user/${userID}`);
    getUsers();
  };

  return (
    <div className="mt-4">
      <h1 className="title has-text-dark">Users</h1>
      <h2 className="subtitle has-text-dark">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">Add User</Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                |
                <button onClick={() => deleteUser(user.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
