import React from "react";
import { connect } from "react-redux";

import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";

function AuthenticationUI({
  isAuthenticated,
  toggleStats,
  logOut,
  areStatsVisible,
  isActive,
  toggleActive,

  // from
}) {
  let history = useHistory();
  // let isAuthenticated = false;

  function authLinks() {
    if (!isAuthenticated) {
      return (
        <div className="auth-div">
          <Link
            to="/register"
            className="main-link"
            onClick={() => {
              if (isActive) {
                toggleActive();
              }
            }}
          >
            Register
          </Link>
          <Link
            to="/login"
            className="main-link"
            onClick={() => {
              if (isActive) {
                toggleActive();
              }
            }}
          >
            Login
          </Link>
         
        </div>
      );
    } else {
      return (
        <div className="auth-div">
          <span className="main-link" onClick={toggleStats}>
            Stats
          </span>
          <span
            className="main-link"
            onClick={() => {
              if (isActive) {
                toggleActive();
              }
              logOut();

              if (areStatsVisible) {
                toggleStats();
              }
            }}
          >
            Logout
          </span>
        </div>
      );
    }
  }

  return authLinks();
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    areStatsVisible: state.visibilityState.areStatsVisible,
    isActive: state.resultsAndTimerState.counter.isActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch({ type: "LOG_IN" }),
    logOut: () => dispatch({ type: "LOG_OUT" }),
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(AuthenticationUI);
