import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(10);

  // for pause button
  const [isActive, toggleActive] = useState(false);

  // for counter
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

  // for pause button
  function toggleTimer() {
    toggleActive(!isActive);
  }

  // for time select
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

function SingleLetter(props) {
  return (
    <span>{props.letterToRender}</span>
  )
}

function Display(props) {
  const [textToRender, setTextToRender] = useState(["t", "e", "s", "t"]);

  let myText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat`;

  let myTextArr = myText.split("");

  console.log("TCL: Display -> myTextArr", myTextArr);

  return (
    <div className="outer-container">
      <h3 className="title">Typing App</h3>
      <div className="main-square">
        <div className="counter container">{props.timerValue}</div>
        <div className="typing-display wiki-display container">
          {textToRender.map((el, i) => {
            return <SingleLetter letterToRender={el} key={i} />
          }
            
          )}
        </div>
        <div
          className="typing-display current-display container"
          contentEditable="true"
        ></div>

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
