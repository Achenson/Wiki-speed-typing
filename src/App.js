import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(10);

  const [isActive, toggleActive] = useState(false);

  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;

    if (isActive) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );
    } else {
      clearInterval(timerInterval);
    }

    // this equivalent to componentWillUnmount
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [isActive, timerValue]);

  function toggleTimer() {
    toggleActive(!isActive);
  }

  function setTimerOnSelect(e) {
    setTimerValue(e.target.value);
  }

  return (
    <div className="App">
      <Display
        timerValue={timerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
      />
    </div>
  );
}

function Display(props) {
  return (
    <div className="outer-container">
      <h3 className="title">Typing App</h3>
      <div className="main-square">
        <div className="counter container">{props.timerValue}</div>
        <div className="typing-display wiki-display container">sfsdfsd</div>
        <div className="typing-display current-display container">sfsdfsd</div>

        <div className="control-buttons-row container">
          <div className="column-left">
            <button className="btn btn-control control-item">Start</button>
            <button
              className="btn btn-control control-item"
              onClick={() => props.toggleTimer()}
            >
              Pause
            </button>
            <select className="control-item" onChange={props.setTimerOnSelect}>
              <option value="10">00:10</option>
              <option value="30">00:30</option>
              <option value="60">01:00</option>
            </select>
          </div>

          <div className="column-right">
            <button className="btn btn-control control-item btn-reset">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
