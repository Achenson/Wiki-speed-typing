import React from "react";
import { connect } from "react-redux";


function AuthenticationUI(

  {isAuthenticated}
) {

  // let isAuthenticated = false;

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



const mapStateToProps = state => {
  return {
    isAuthenticated: state.authState.isAuthenticated,


  };
};


const mapDispatchToProps = dispatch => {
  return {
    LogIn: () => dispatch({ type: "LOG_IN"}),
    LogOut: () => dispatch({ type: "LOG_OUT" }),
   
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(AuthenticationUI);