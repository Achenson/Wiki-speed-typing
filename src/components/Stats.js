import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Stats({
  areStatsVisible,
  // from statsReducer
  five_s,
  thirty_s,
  one_min,
  two_min,
  five_min
}) {
  const [currentTimer, setCurrentTimer] = useState(one_min[0]);

  /*  useEffect( () => {

    setCurrentTimer(five_s)

  }, [five_s, thirty_s, one_min, five_min, ten_min]
  ) */

  function changeCurrentTimer(e) {
   
    console.log(e.target.value)

    switch (e.target.value) {
      case "5":
        console.log('this')
        setCurrentTimer(five_s[0]);
        break;
        // valueToSet = five_s[0];
      case "30":
        setCurrentTimer(thirty_s[0]);
        break;
        // valueToSet = thirty_s[0];
      case "60":
        setCurrentTimer(one_min[0]);
        break;
        // valueToSet = one_min[0];
      case "120":
        setCurrentTimer(two_min[0]);
        break;
        // valueToSet = two_min[0];
      case "300":
        setCurrentTimer(five_min[0]);
        break;
        // valueToSet = five_min[0];

      default:
        setCurrentTimer(one_min[1]);
        // valueToSet = one_min[0];
    }

    console.log(currentTimer)
    // setCurrentTimer(valueToSet);
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
              onChange={changeCurrentTimer}
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
          <li>135 KPM &nbsp;|&nbsp; 98%</li>
          <li>{currentTimer}</li>
          <li>-</li>
          <li>-</li>
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
    thirty_s: state.statsState.thirty_s,
    one_min: state.statsState.one_min,
    two_min: state.statsState.two_min,
    five_min: state.statsState.five_min
  };
};

export default connect(
  mapStateToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);
