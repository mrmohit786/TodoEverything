import React, { Fragment } from "react";

const Login = () => {
  return (
    <Fragment>
      <div className="container mt-3 p-3">
        <h3>LOGIN</h3>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
