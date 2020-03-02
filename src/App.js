import React from "react";
import { useState, useEffect, useRef} from "react";

import Display from "./components/Display.js";

import "./App.css";
import Fetch from "./components/Fetch.js";

import loremText from "./components/_DefaultText.js"

function App() {
  const [timerValue, setTimerValue] = useState(60);
  const [constantTimerValue, setConstantTimerValue] = useState(60);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);

  // for Results
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
    function toggleResults() {
     setAreResultsVisible(!areResultsVisible);
   }

  // for counter
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;
    let intervalForDisplay = null;

    // for displaying 0speed & 0 accuracy if the counter becomes active
    if (isActive && timerValue === constantTimerValue) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );
      // for displaying live results every 2 seconds
      if (isActive && timerValue % 2 === 0 && timerValue > 0) {
        setResultsObj(
          resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
        );
      }

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
    // turning counter off on pause
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

      if (!areResultsVisible) {
        toggleResults();
      }

      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    // this equivalent to componentWillUnmount
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes

    // 'areResultsVisible', 'constantTimerValue', 'resultsCorrect', 'resultsIncorrect',
    //  'resultsMaker', 'resultsNoPenalty', and 'toggleResults' added because of the warning,
    // not used actually
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
    if (isActive) {
      isDisabled.current.setAttribute("disabled", true);
    } else {
      isDisabled.current.removeAttribute("disabled");
    }
  }, [isActive]);

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

        myText={myText}
        // setMyText={setMyText}
        wikiTitle={wikiTitle}
        // setWikiTitle={setWikiTitle}
// newRandomArticle={newRandomArticle}
        setNewRandomArticle={setNewRandomArticle}

        disablingButton={disablingButton}

      />
    </div>
  );
}

export default App;
