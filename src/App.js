/* 

possible issues: 
1.can't pause during first second (ignore it?)
2. result are being hidden after 1 second if the timer is on
(make the btn unresponsive if the timer is on)
DONE 3. Disable time select if the app is running!!! DONE

toChange:
1. counter display (00:00 format)
2. Start is also a pause btn (change it to arrow and ||)
3. Set default select value to higher val
4. Results display to fast - add some animation??
5. show|hide results -> make the button name togglable show & hide?
6. uninstall compose refs?
7. contrast between main square and correct letters
8. display hint& result on one of the displays?
9. add tooltips!!!
10. resultObj and set individual results redundant!!???
*/

import React from "react";
import { useState, useEffect, useRef } from "react";
import composeRefs from "@seznam/compose-react-refs";

import Display from "./components/Display.js";

import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(5);
  const [constantTimerValue, setConstantTimerValue] = useState(5);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);

  // for Results

  const [resultsSpeed, setResultsSpeed] = useState(0);
  //const [resultsAccuracy, setResultsAccuracy] = useState(0);
  const [resultsCorrect, setResultsCorrect] = useState(0);
  const [resultsIncorrect, setResultsIncorrect] = useState(0);
  const [resultsNoPenalty, setResultsNoPenalty] = useState(0);

  // delete ?!!!
  const [resultsObj, setResultsObj] = useState({
    speed: 0,
    accuracy: 0,
    correct: 0,
    incorrect: 0,
    noPenalty: 0,
    "timer length": 7,
    date: 8
  });

  function resultsMaker(speed, correct, incorrect, noPenalty) {
    return {
      speed: speed,
      accuracy: Math.round((correct / noPenalty) * 10000) / 100,
      correct: correct,
      incorrect: incorrect,
      noPenalty: Math.round(noPenalty * (constantTimerValue / 60) * 100) / 100,
      "timer length": constantTimerValue.toString(),
      date: Date.now().toString()
    };
  }

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  // for counter
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );

      if (areResultsVisible) {
        toggleResults();
      }
    }

    if (toReset) {
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      toggleActive(false);
      setToReset(false);
    }

    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
    }

    if (timerValue <= 0) {
      // reseting results
      setResultsSpeed(0);
      //setResultsAccuracy(0);
      setResultsCorrect(0);
      setResultsIncorrect(0);
      setResultsNoPenalty(0);

      toggleActive(false);
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setToReset(true);

      if (!areResultsVisible) {
        toggleResults();
      }

      setResultsObj(
        resultsMaker(
          resultsSpeed,

          resultsCorrect,
          resultsIncorrect,
          resultsNoPenalty
        )
      );

      //setToReset(false);
    }

    // this equivalent to componentWillUnmount
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [isActive, timerValue, toReset]);

  // for pause button
  function toggleTimer() {
    toggleActive(!isActive);
  }

  // for time select
  function setTimerOnSelect(e) {
    setTimerValue(e.target.value);
    setConstantTimerValue(e.target.value);
  }

  function resetTimer() {
    if (timerValue !== constantTimerValue) {
      setToReset(true);
    }

    return;
  }

  //  for key press
  let keysPressed = {};

  function handleKeyPress(event) {
    // pause button will work only if the timer hasn't started yet
    if (constantTimerValue !== timerValue) {
      keysPressed[event.key] = true;

      //if (keysPressed["Shift"] && event.key == "Pause") {
      if (event.key == "Tab" && isActive) {
        toggleTimer();
        delete keysPressed[event.key];
      }

      if (keysPressed["Shift"] && event.key == "Delete") {
        resetTimer();

        delete keysPressed[event.key];
      }
    }

    //toggleTimer();

    return;
  }

  // hints & results visibility
  const [areHintsVisible, setAreHintsVisible] = useState(false);

  function toggleHints() {
    setAreHintsVisible(!areHintsVisible);
  }

  const [areResultsVisible, setAreResultsVisible] = useState(false);

  function toggleResults() {
    setAreResultsVisible(!areResultsVisible);
  }

  // for disabling select

  const isDisabled = useRef(null);

  useEffect(() => {
    if (isActive) {
      isDisabled.current.setAttribute("disabled", true);
    } else {
      isDisabled.current.removeAttribute("disabled");
    }
  }, [isActive]);

  // useRef unfocusing textArea

  const focusElement = useRef(null);
  const focusTextArea = useRef(null);

  useEffect(() => {
    if (timerValue <= 0) {
      focusElement.current.focus();
    }
  }, [timerValue]);

  useEffect(() => {
    if (isActive) {
      putFocusOnTextArea();
    }
  }, [isActive]);

  function putFocusOnTextArea() {
    focusTextArea.current.focus();
  }

  return (
    <div className="App" onKeyDown={handleKeyPress}>
      <Display
        timerValue={timerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        areHintsVisible={areHintsVisible}
        areResultsVisible={areResultsVisible}
        toggleHints={toggleHints}
        toggleResults={toggleResults}
        isDisabled={isDisabled}
        focusTextArea={focusTextArea}
        putFocusOnTextArea={putFocusOnTextArea}
        focusElement={focusElement}
        
        setResultsObj={setResultsObj}
        resultsObj={resultsObj}
        resultsMaker={resultsMaker}
        setResultsSpeed={setResultsSpeed}
        //setResultsAccuracy={setResultsAccuracy}

        resultsCorrect={resultsCorrect}
        setResultsCorrect={setResultsCorrect}
        resultsIncorrect={resultsIncorrect}
        setResultsIncorrect={setResultsIncorrect}
        setResultsNoPenalty={setResultsNoPenalty}
        resultsNoPenalty={resultsNoPenalty}
      />
    </div>
  );
}

export default App;
