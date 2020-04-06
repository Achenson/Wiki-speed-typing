import React from "react";

function Login() {
  // let isAuthenticated = false;

  return (
    <div className="form-div">
      <div className="title-login-div">
        <h3 className="title title-login">Login</h3>
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
    </div>
  );
}

export default Login;
