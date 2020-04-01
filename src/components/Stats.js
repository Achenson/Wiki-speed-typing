import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import SingleStat from "./SingleStat";

function Stats({
  areStatsVisible,
  // from statsReducer
  five_s,
  thirty_s,
  one_min,
  two_min,
  five_min
}) {
  const [currentStatsArr, setCurrentStatsArr] = useState(one_min);

  function changeCurrentStatsArr(e) {
    switch (e.target.value) {
      case "5":
        setCurrentStatsArr(five_s);
        break;
      case "30":
        setCurrentStatsArr(thirty_s);
        break;
      case "60":
        setCurrentStatsArr(one_min);
        break;
      case "120":
        setCurrentStatsArr(two_min);
        break;
      case "300":
        setCurrentStatsArr(five_min);
        break;

      default:
        setCurrentStatsArr(one_min);
    }
  }

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
              onChange={changeCurrentStatsArr}
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
          {currentStatsArr.map((el, i) => {
            if (i > 9) {
              return null;
            } else {
              return <SingleStat speed={el[0]} accuracy={el[1]} key={i} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    five_s: state.resultsAndTimerState.stats.five_s,
    thirty_s: state.resultsAndTimerState.stats.thirty_s,
    one_min: state.resultsAndTimerState.stats.one_min,
    two_min: state.resultsAndTimerState.stats.two_min,
    five_min: state.resultsAndTimerState.stats.five_min
  };
};

export default connect(
  mapStateToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);
