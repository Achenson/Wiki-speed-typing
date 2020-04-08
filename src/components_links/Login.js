import React from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";

function Login({
  logIn
}) {
  // let isAuthenticated = false;

  return (
    <div className="outer-container">
     
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

            <button className="btn btn-control btn-auth" onClick={(e) => 
            
            {e.preventDefault()
            
            logIn()
            
            }}>
              Login
            </button>
          </form>
          <div className="auth-links-div">
            <p className="auth-link-item">
              No account?&nbsp;Register <Link to="/register" className="auth-link">here</Link>
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


const mapDispatchToProps = dispatch => {
  return {
    logIn: () => dispatch({ type: "LOG_IN" })
    
  };
};


export default connect(
  null,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Login);
