import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    errors: [],
  });
  let { name, email, password, errors } = values;

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify({ name, email, password }));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        body,
        config
      );

      if (res.data) {
        console.log(res.data);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          errors: [],
        });

        return <Redirect to="/" />;
      }
    } catch (error) {
      errors = error.response.data.errors;
      console.log(errors);
    }
  };

  const errorMessage = (errors) => {
    return errors.map((error, index) => (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger">
            <h3 key={index}>{error.msg}</h3>
          </div>
        </div>
      </div>
    ));
  };

  // const successMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div
  //           className="alert alert-success"
  //           style={{ display: success ? "" : "none" }}
  //         >
  //           New account was created successfully. Please
  //           <Link className="bg-success" to="/signin">
  //             Login Here
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <Fragment>
      <div className="container p-3 mt-3">
        <h3>REGISTER</h3>
        {errors && errorMessage(errors)}
        <form className="form-group" onSubmit={(e) => onSubmit(e)}>
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
