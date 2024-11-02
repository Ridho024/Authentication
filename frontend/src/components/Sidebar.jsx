import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside class="menu has-shadow pl-2 pt-4">
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <NavLink to={"/dashboard"} className="mb-1 has-text-dark" style={{ backgroundColor: "white" }}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"} className="has-text-dark" style={{ backgroundColor: "white" }}>
              Products
            </NavLink>
          </li>
        </ul>
        <p class="menu-label">Admin</p>
        <ul class="menu-list">
          <li>
            <NavLink className="has-text-dark" style={{ backgroundColor: "white" }}>
              Users
            </NavLink>
          </li>
        </ul>
        <p class="menu-label">Settings</p>
        <ul class="menu-list">
          <li>
            <button className="button is-white">Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
