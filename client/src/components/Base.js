import React from "react";
import { NavLink } from "react-router-dom";

const Base = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-primary ">
      <NavLink className="navbar-brand" to="/">
        ToDoEverything
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav ">
          <li className="nav-item">
            <NavLink className="nav-link " to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/tasks">
              Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Base;
