import React, { useState, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  //Set Input Values
  const [values, setValues] = useState({
    email: "",
    password: "",
    erros: false,
    redirect: false,
  });

  //Destructure values
  const { email, password, errors, redirect } = values;

  //get Input value
  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  // on submit
  const onSubmit = async (event) => {
    //prevent page to reload
    event.preventDefault();

    //add header to axios request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //convert data to json string
    const body = JSON.stringify({ email, password });

    try {
      // @api POST register user
      const res = await axios.post(
        "http://localhost:5000/api/login",
        body,
        config
      );

      //check if user not register
      if (!res.data) {
        console.log("LOGIN FAILED");
      }

      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setValues({ ...values, redirect: true });
      }

      //reset input values
      setValues({
        ...values,
        email: "",
        password: "",
        errors: false,
        redirect: false,
      });
    } catch (err) {
      if (err) {
        setValues({ ...values, errors: err.response.data.errors });
      }
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="container mt-3 p-3">
        <h3>LOGIN</h3>
        {errors &&
          errors.map((error, index) => (
            <div key={index} className="row">
              <div className="col-sm text-left">
                <div className="alert alert-danger">
                  <p>{error.msg}</p>
                </div>
              </div>
            </div>
          ))}

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(e) => onChange(e)}
              value={email}
              type="email"
              name="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={(e) => onChange(e)}
              value={password}
              type="password"
              name="password"
              className="form-control"
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
