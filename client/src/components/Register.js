import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  //Set Input Values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    erros: false,
    success: false,
  });

  //Destructure values
  const { name, email, password, errors, success } = values;

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
    const body = JSON.stringify({ name, email, password });

    try {
      // @api POST register user
      const res = await axios.post(
        "http://localhost:5000/api/register",
        body,
        config
      );

      //check if user not register
      if (!res.data) {
        console.log("REGISTRATION FAILED");
      }

      if (res.data) {
        setValues({ ...values, success: true });
      }

      //reset input values
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        errors: false,
        success: true,
      });
    } catch (err) {
      if (err) {
        setValues({ ...values, errors: err.response.data.errors });
      }
    }
  };

  return (
    <Fragment>
      <div className="container p-3 mt-3">
        <h3>REGISTER</h3>

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

        {success && (
          <div className="row">
            <div className="col-sm text-left">
              <div className="alert alert-success">
                Register Successfully , Please{" "}
                <Link className="text-success" to="/login">
                  Login Here
                </Link>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={(e) => onChange(e)}
              required
              className="form-control"
              name="name"
              value={name}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(e) => onChange(e)}
              required
              className="form-control"
              name="email"
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={(e) => onChange(e)}
              required
              name="password"
              className="form-control"
              value={password}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
