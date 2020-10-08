import React, { Fragment } from "react";

const Profile = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="m-3">
          <p>Name : Mohit Patel</p>

          <p>Email : mohit@gmail.com</p>

          <button type="button" className="btn btn-primary">
            Edit Info
          </button>
          <button type="button" className="btn btn-danger ml-1">
            Delete Profile
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default Profile;
