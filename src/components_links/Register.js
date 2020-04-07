import React from "react";

function Register() {
  // let isAuthenticated = false;

  return (
    <div className="form-div">
      <div className="title-login-div">
        <h3 className="title title-login">Register</h3>
      </div>
      <form className="form">
        {/* associating label with input without ID -> nesting */}
        <label className="label">
          Email address
          <input className="input" type="email" />
        </label>
        <br />
        <br />

        <label className="label">
          Password
          <input className="input" type="password" />
        </label>
        <br />

        <button className="btn btn-control btn-login" type="submit">
          Login
        </button>
      </form>
      <div className="login-links-div">
        <p className="login-link-item">
          No account?&nbsp;<a>register here</a>
        </p>

        <p className="login-link-item">
          <a>Back&nbsp;</a>to speed typing
        </p>
      </div>
    </div>
  );
}

export default Register;