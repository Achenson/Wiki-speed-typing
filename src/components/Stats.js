import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import SingleStat from "./SingleStat";

function Stats({
  areStatsVisible,
  // from statsReducer
  currentStatsArr,

  setCurrentStatsArr,
  deleteCurrentStatsArr,
  five_s,
  thirty_s,
  one_min,
  two_min,
  five_min
}) {
  // const [currentStatsArr, setCurrentStatsArr] = useState(one_min);

  //  function changeCurrentStatsArr(e) {
    /* switch (e.target.value) {
      case "5":
        // setCurrentStatsArr(five_s);
        break;
      case "30":
        // setCurrentStatsArr(thirty_s);
        break;
      case "60":
        // setCurrentStatsArr(one_min);
        break;
      case "120":
        // setCurrentStatsArr(two_min);
        break;
      case "300":
        // setCurrentStatsArr(five_min);
        break;

      default:
        // setCurrentStatsArr(one_min);
    } */
    // setCurrentStatsArr(e.target.value)
  //  } 

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
              onChange={(e) => setCurrentStatsArr(e.target.value)}
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
        
        <div className="delete-top-score-div">
        <span className="delete-top-score-text">
          {/* Delete top score for selected timer length -&nbsp; */}
          Delete top score for selected timer length&nbsp;&nbsp;
        </span>
        <button
          className="btn btn-control control-item btn-reset btn-delete-stats"
          // onClick={event => {
            // props.resetTimer();
            // props.putFocusOnTextArea();
          // }}
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
    currentStatsArr: state.resultsAndTimerState.stats.currentStatsArr,
    five_s: state.resultsAndTimerState.stats.five_s,
    thirty_s: state.resultsAndTimerState.stats.thirty_s,
    one_min: state.resultsAndTimerState.stats.one_min,
    two_min: state.resultsAndTimerState.stats.two_min,
    five_min: state.resultsAndTimerState.stats.five_min
  };
};


const mapDispatchToProps = dispatch => {
  return {
    setCurrentStatsArr: (data) => dispatch({ type: "SET_CURRENT_STATS", payload: data }),
    deleteCurrentStatsArr: () => dispatch({ type: "DELETE_CURRENT_STATS" }),
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);
