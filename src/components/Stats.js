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
  const [currentStatsArr, setCurrentStatsArr] = useState(one_min);

 /*  useEffect( () => {

   

    


    



  }, [e.target.value]
  )  */

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
          <li>{currentStatsArr[0][0]} KPM &nbsp;|&nbsp; {currentStatsArr[0][1]}%</li>
          <li>{currentStatsArr[1][0]} KPM &nbsp;|&nbsp; {currentStatsArr[1][1]}%</li>
          <li>{currentStatsArr[2][0]} KPM &nbsp;|&nbsp; {currentStatsArr[2][1]}%</li>
          <li>{currentStatsArr[3][0]} KPM &nbsp;|&nbsp; {currentStatsArr[3][1]}%</li>
          <li>{currentStatsArr[4][0]} KPM &nbsp;|&nbsp; {currentStatsArr[4][1]}%</li>
          <li>{currentStatsArr[5][0]} KPM &nbsp;|&nbsp; {currentStatsArr[5][1]}%</li>
          <li>{currentStatsArr[6][0]} KPM &nbsp;|&nbsp; {currentStatsArr[6][1]}%</li>
          <li>{currentStatsArr[7][0]} KPM &nbsp;|&nbsp; {currentStatsArr[7][1]}%</li>
          <li>{currentStatsArr[8][0]} KPM &nbsp;|&nbsp; {currentStatsArr[8][1]}%</li>
          <li>{currentStatsArr[9][0]} KPM &nbsp;|&nbsp; {currentStatsArr[9][1]}%</li>
        
        
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
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
)(Stats);
