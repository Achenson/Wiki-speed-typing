import React from "react";

function Login() {
  // let isAuthenticated = false;

  return (
    <div className="outer-container-auth">
      <div className="main-square-auth">
        <div className="form-div">
          <div className="title-auth-div">
            <h3 className="title title-auth">Login</h3>
          </div>
          <form className="form">
            {/* associating label with input without ID -> nesting */}
            <label className="label">
              Email address / username
              <input className="input" type="email" />
            </label>
            <br />
            <br />

            <label className="label">
              Password
              <input className="input" type="password" />
            </label>
            <br />

            <button className="btn btn-control btn-auth" type="submit">
              Login
            </button>
          </form>
          <div className="auth-links-div">
            <p className="auth-link-item">
              No account?&nbsp;<a>register here</a>
            </p>

            <p className="auth-link-item">
              <a>Back&nbsp;</a>to speed typing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
