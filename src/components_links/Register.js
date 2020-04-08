import React from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

function Register() {
  // let isAuthenticated = false;

  return (
    <div className="outer-container">
     
    <div className="main-square-auth">
      <div className="form-div">
        <div className="title-auth-div">
          <h3 className="title title-auth">Register</h3>
        </div>
        <form className="form">
          {/* associating label with input without ID -> nesting */}
          <label className="label">
            Username
            <input className="input" type="text" />
          </label>

          <label className="label">
            Email address
            <input className="input" type="email" />
          </label>
<br/><br/>
          <label className="label">
            Password
            <input className="input" type="password" />
          </label>
          <label className="label">
            Confirm password
            <input className="input" type="password" />
          </label>
          <br />

          <button className="btn btn-control btn-auth" type="submit">
            Register
          </button>
        </form>
        <div className="auth-links-div">
          <p className="auth-link-item">
            Already registered?&nbsp;Login <Link to="/login" className="auth-link">here</Link>
          </p>

          <p className="auth-link-item">
            <Link to="/" className="auth-link">Back</Link>&nbsp;to speed typing
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
