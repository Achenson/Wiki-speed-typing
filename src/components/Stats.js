import React from "react";
//import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

function Stats(props) {
  return (
    <div
      className="stats"
      style={{
        visibility: `${props.areStatsVisible ? "visible" : "hidden"}`
      }}
    >
     

      <div className="inner-stats container">
      <div className="top-score-main">
        <p className="top-score-title">Top score</p>
        <div className="top-score-select-div">
          <p>timer length:&nbsp;</p>
        <select
          className="control-item timer-select top-score-timer-select"
          // onChange={props.setTimerOnSelect}
          // ref={props.isDisabled}
          defaultValue="60"
        >
          <option value="5">00:05</option>
          <option value="30">00:30</option>
          <option value="60">01:00</option>
          <option value="120">02:00</option>
          <option value="300">05:00</option>
        </select>
        </div>
      


      </div>


        <ul className="top-score-list container">
          <li>-</li>
          <li>-</li>
          <li>
            -
          </li>
          <li>
            -
          </li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
        </ul>
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    five_s: state.statsState.five_s,
    
  };
};

export default connect(
  mapStateToProps,
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);

