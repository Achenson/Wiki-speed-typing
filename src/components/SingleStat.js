import React from "react";
import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

function SingleStat({ speed, accuracy, key }) {
  let isThisARecord;

  if (speed === 0 && accuracy === 0) {
    isThisARecord = false;
  } else {
    isThisARecord = true;
  }

  return (
    <Fragment>
      {isThisARecord ? (
        <li>
          {speed} KPM &nbsp;|&nbsp; {accuracy}%
        </li>
      ) : (
       <li>-</li>
      )}
    </Fragment>
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

export default SingleStat;
