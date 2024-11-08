import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate("/users");

  const addUser = async (e) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setMsg("Password dan password confirmation tidak sama");
      } else {
        await axios.post("http://localhost:5000/users", {
          name: name,
          email: email,
          password: password,
          passwordConfirmation: confPassword,
          role: role,
        });

        navigate("/users");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.msg);
      }
    }
  };

  return (
    <div className="mt-4 pl-5">
      <h1 className="title has-text-dark">Users</h1>
      <h2 className="subtitle has-text-dark">Add New User</h2>
      <div className="card is-shadowless columns has-background-light">
        <div className="card-content column is-half">
          <div className="content">
            <form onSubmit={addUser} className="box">
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className="input" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={(e) => setRole(e.target.value)} value={role}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" className="input" placeholder="*****" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input type="password" className="input" placeholder="*****" onChange={(e) => setConfPassword(e.target.value)} value={confPassword} />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
