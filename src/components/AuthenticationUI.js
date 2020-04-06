import React from "react";

function AuthenticationUI() {

  let isAuthenticated = true;

  function authLinks() {
    if (!isAuthenticated) {
      return (
        <div className="auth-div">
          <a className="auth-link">Register</a>
          <a className="auth-link">Login</a>
        </div>
      );
    } else {
      return (
        <div className="auth-div">
          <a className="auth-link">Stats</a>
          <a className="auth-link">Logout</a>
        </div>
      );
    }
  }

  return (
     authLinks()
  );
}

export default AuthenticationUI;
