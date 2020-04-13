import React from "react";
// import { connect } from "react-redux";




function AuthNotification({
  notification={notification},
  colorClass={colorClass}

}) {
 




  return (
    <div className={`auth-notification-div ${colorClass}`}>
    <p>{notification}</p>
    </div>
  );
}

/* const mapStateToProps = state => {
  return {
    five_s: state.totalState.stats.five_s,
    thirty_s: state.totalState.stats.thirty_s,
    one_min: state.totalState.stats.one_min,
    two_min: state.totalState.stats.two_min,
    five_min: state.totalState.stats.five_min
  };
};

export default connect(
  mapStateToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats); */

export default AuthNotification;
