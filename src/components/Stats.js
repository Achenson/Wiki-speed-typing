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
  const [currentTimer, setCurrentTimer] = useState(one_min);

  /*  useEffect( () => {

    setCurrentTimer(five_s)

  }, [five_s, thirty_s, one_min, five_min, ten_min]
  ) */

  function changeCurrentTimer(e) {
   

    switch (e.target.value) {
      case "5":
        setCurrentTimer(five_s);
        break;
      case "30":
        setCurrentTimer(thirty_s);
        break;
      case "60":
        setCurrentTimer(one_min);
        break;
      case "120":
        setCurrentTimer(two_min);
        break;
      case "300":
        setCurrentTimer(five_min);
        break;

      default:
        setCurrentTimer(one_min);
        
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
          <li>{currentTimer[0][0]} KPM &nbsp;|&nbsp; {currentTimer[0][1]}%</li>
          <li>{currentTimer[1][0]} KPM &nbsp;|&nbsp; {currentTimer[1][1]}%</li>
          <li>{currentTimer[2][0]} KPM &nbsp;|&nbsp; {currentTimer[2][1]}%</li>
          <li>{currentTimer[3][0]} KPM &nbsp;|&nbsp; {currentTimer[3][1]}%</li>
          <li>{currentTimer[4][0]} KPM &nbsp;|&nbsp; {currentTimer[4][1]}%</li>
          <li>{currentTimer[5][0]} KPM &nbsp;|&nbsp; {currentTimer[5][1]}%</li>
          <li>{currentTimer[6][0]} KPM &nbsp;|&nbsp; {currentTimer[6][1]}%</li>
          <li>{currentTimer[7][0]} KPM &nbsp;|&nbsp; {currentTimer[7][1]}%</li>
          <li>{currentTimer[8][0]} KPM &nbsp;|&nbsp; {currentTimer[8][1]}%</li>
          <li>{currentTimer[9][0]} KPM &nbsp;|&nbsp; {currentTimer[9][1]}%</li>
        
        
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
