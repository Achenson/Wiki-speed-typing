import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

import Display from "./components/Display.js";

import "./App.css";
import Fetch from "./components/Fetch.js";

import loremText from "./components/_DefaultText.js";

function App() {
  const [timerValue, setTimerValue] = useState(60);
  const [constantTimerValue, setConstantTimerValue] = useState(60);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);
  // is the counter running
  const [isCounterRunning, setIsCounterRunning] = useState(false);

  // for live results & setting <Result/> when the run is finished
  const [resultsCorrect, setResultsCorrect] = useState(0);
  const [resultsIncorrect, setResultsIncorrect] = useState(0);
  const [resultsNoPenalty, setResultsNoPenalty] = useState(0);

  const [resultsObj, setResultsObj] = useState({
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": constantTimerValue
  });

  // for <Result/>

  let [resultsAfterFinish, setResultsAfterFinish] = useState({
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": ""
  });

  // disabling random wiki article button
  const disablingButton = useRef(null);

  // for displaying text

  const [myText, setMyText] = useState(loremText);
  const [wikiTitle, setWikiTitle] = useState("");
  // newRandomArticle will be fetched if true
  const [newRandomArticle, setNewRandomArticle] = useState(true);

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  });

  // hints & results visibility
  const [areHintsVisible, setAreHintsVisible] = useState(false);
  const [areResultsVisible, setAreResultsVisible] = useState(false);

  function toggleHints() {
    if (!isActive) {
      setAreHintsVisible(!areHintsVisible);
    }
  }

  /*  function def changed to useCallback because of warning below:
   (to prevent unnecessary renders?)
   Line 119:4:  The 'toggleResults' function makes the dependencies of useEffect Hook
    (at line 232) change on every render. To fix this, wrap the 'toggleResults' definition
     into its own useCallback() Hook  react-hooks/exhaustive-deps
*/

  // for turning results off when the timer is running  =========

  //useCallback is used so useEffect below won't run on every every time toggleResults function is called
  const toggleResults = useCallback(() => {
    // functional update(r=>!r) so the useCallback don't depend on areResultsVisible
    setAreResultsVisible(r => !r);
  }, []);

  useEffect(() => {
    if (isActive && timerValue > 0 && areResultsVisible) {
      toggleResults();
    }

    if (!areResultsVisible && timerValue <= 0) {
      toggleResults();
    }
  }, [isActive, timerValue, areResultsVisible, toggleResults]);

  // for live results display every 2s

  useEffect(() => {
    // for displaying 0speed & 0 accuracy if the counter becomes active

    //  if (isActive && !isCounterRunning) {
    if (isActive && timerValue === constantTimerValue) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    if (isActive && timerValue % 2 === 0) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    // setting results
    if (timerValue <= 0) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );

      // results for <Results/>
      setResultsAfterFinish(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    function resultsMaker(correct, incorrect, allEntries) {
      // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live
      let noPenaltyKPM =
        Math.round(
          ((allEntries * 60) / (constantTimerValue - timerValue)) * 100
        ) / 100;
      let incorrectPerMinute =
        (incorrect * 60) / (constantTimerValue - timerValue);
      // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
      let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

      return {
        speed: calcSpeed(),
        accuracy: calcAccuracy(),
        correct: correct,
        incorrect: incorrect,
        noPenalty: noPenaltyKPM,
        "timer length": constantTimerValue.toString()
      };

      function calcSpeed() {
        if (penaltyKPM >= 0) {
          return Math.round(penaltyKPM * 10) / 10;
        } else {
          return 0;
        }
      }

      function calcAccuracy() {
        if (allEntries > 0) {
          let accuracyResult = Math.round((correct / allEntries) * 1000) / 10;
          return accuracyResult;
        } else {
          return 0;
        }
      }
    }
  }, [isActive, timerValue, constantTimerValue]);

  // for counter  =======
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;
    let intervalForDisplay = null;

    // for displaying 0speed & 0 accuracy if the counter becomes active

    /* if (isActive && timerValue === constantTimerValue) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    } */

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );

      if (!isCounterRunning) {
        setIsCounterRunning(b => !b);
      }
    }

    if (toReset) {
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      toggleActive(false);
      
      if (isCounterRunning) {
        setIsCounterRunning(b => !b);
      }
      setToReset(false);
    }
    // turning interval off on pause
    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
      clearInterval(intervalForDisplay);
    }

    if (timerValue <= 0) {
      // reseting results
      setResultsCorrect(0);
      setResultsIncorrect(0);
      setResultsNoPenalty(0);

      toggleActive(false);
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setToReset(true);

      if (isCounterRunning) {
        setIsCounterRunning(b => !b);
      }
    }

    // this equivalent to componentWillUnmount
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [isActive, timerValue, toReset, isCounterRunning, constantTimerValue]);

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
    // if (timerValue !== constantTimerValue) {
    if (isCounterRunning) {
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
      if (event.key === "Tab" && isActive) {
        toggleTimer();
        delete keysPressed[event.key];
      }

      if (keysPressed["Shift"] && event.key === "Delete") {
        resetTimer();

        delete keysPressed[event.key];
      }
    }

    return;
  }

  // for disabling select
  const isDisabled = useRef(null);

  useEffect(() => {
    if (isActive || isCounterRunning) {
      isDisabled.current.setAttribute("disabled", true);
    } else {
      isDisabled.current.removeAttribute("disabled");
    }
  }, [isActive, isCounterRunning]);

  // useRef unfocusing btn-hints on textarea focus
  // useRef focusin on textArea is the timer is active

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
      <Fetch
        myText={myText}
        setMyText={setMyText}
        wikiTitle={wikiTitle}
        setWikiTitle={setWikiTitle}
        newRandomArticle={newRandomArticle}
        setNewRandomArticle={setNewRandomArticle}
        disablingButton={disablingButton}
        loremText={loremText}
      />
      <Display
        // timer
        timerValue={timerValue}
        constantTimerValue={constantTimerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        // hints & results visibility
        areHintsVisible={areHintsVisible}
        areResultsVisible={areResultsVisible}
        toggleHints={toggleHints}
        toggleResults={toggleResults}
        // disabling select, menaging focus
        isDisabled={isDisabled}
        focusTextArea={focusTextArea}
        putFocusOnTextArea={putFocusOnTextArea}
        focusElement={focusElement}
        // results
        resultsObj={resultsObj}
        resultsCorrect={resultsCorrect}
        setResultsCorrect={setResultsCorrect}
        resultsIncorrect={resultsIncorrect}
        setResultsIncorrect={setResultsIncorrect}
        resultsNoPenalty={resultsNoPenalty}
        setResultsNoPenalty={setResultsNoPenalty}
        resultsAfterFinish={resultsAfterFinish}
        myText={myText}
        // setMyText={setMyText}
        wikiTitle={wikiTitle}
        // setWikiTitle={setWikiTitle}
        // newRandomArticle={newRandomArticle}
        setNewRandomArticle={setNewRandomArticle}
        disablingButton={disablingButton}
        r
      />
    </div>
  );
}

export default App;
