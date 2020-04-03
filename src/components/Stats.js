import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import SingleStat from "./SingleStat";

function Stats({
  areStatsVisible,
  // from statsReducer
  currentStatsKey,

  setCurrentStatsKey,
  currentStats,
  deleteCurrentStatsArr,
  five_s,
  thirty_s,
  one_min,
  two_min,
  five_min
}) {
 

  return (
    <div
      className="stats"
      style={{
        visibility: `${areStatsVisible ? "visible" : "hidden"}`
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
              onChange={(e) => setCurrentStatsKey(e.target.value)}
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
        {/* !! [] not . */}
          {currentStats[currentStatsKey].map((el, i) => {
            if (i > 9) {
              return null;
            } else {
              return <SingleStat speed={el[0]} accuracy={el[1]} key={i} />;
            }
          })}
        </ul>
        
        <div className="delete-top-score-div">
        <span className="delete-top-score-text">
          {/* Delete top score for selected timer length -&nbsp; */}
          Delete top score for selected timer length&nbsp;&nbsp;
        </span>
        <button
          className="btn btn-control control-item btn-reset btn-delete-stats"
          onClick={
             deleteCurrentStatsArr
           }
        >
          x
        </button>
        </div>

     
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentStatsKey: state.resultsAndTimerState.stats.currentStatsKey,
    currentStats: state.resultsAndTimerState.stats
  };
};


const mapDispatchToProps = dispatch => {
  return {
    setCurrentStatsKey: (data) => dispatch({ type: "SET_CURRENT_STATS", payload: data }),
    deleteCurrentStatsArr: () => dispatch({ type: "DELETE_CURRENT_STATS" }),
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);
