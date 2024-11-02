import React from "react";

const FormAddUser = () => {
  return (
    <div className="mt-4 pl-5">
      <h1 className="title has-text-dark">Users</h1>
      <h2 className="subtitle has-text-dark">Add New User</h2>
      <div className="card is-shadowless columns has-background-light">
        <div className="card-content column is-half">
          <div className="content">
            <form action="" className="box">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="email" />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className="input" placeholder="email" />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" className="input" placeholder="*****" />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input type="password" className="input" placeholder="*****" />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <button className="button is-success">Save</button>
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
