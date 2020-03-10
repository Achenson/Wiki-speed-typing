import React from "react";
import { useState, useEffect, useRef, useCallback, useReducer } from "react";

import Display from "./components/Display.js";

import "./App.css";
import Fetch from "./components/Fetch.js";

import loremText from "./components/_defaultText.js";

function App() {
  const [timerValue, setTimerValue] = useState(60);
  const [constantTimerValue, setConstantTimerValue] = useState(60);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);
  // reseting display if reset btn is clicked or if Timer runs out
  const [displayToReset, setDisplayToReset] = useState(false);

  // is the counter running
  const [isCounterRunning, setIsCounterRunning] = useState(false);

  // for live results & setting <Result/> when the run is finished

  const initialState = {
    currentResults: {
      resultsCorrect: 0,
      resultsIncorrect: 0,
      resultsNoPenalty: 0
    },
    liveResults: {
      speed: "-",
      accuracy: "- ",
      correct: "-",
      incorrect: "-",
      noPenalty: "-",
      "timer length": constantTimerValue
    },
    finalResults: {
      speed: "-",
      accuracy: "- ",
      correct: "-",
      incorrect: "-",
      noPenalty: "-",
      "timer length": ""
    }
  };

  function reducer(state, action) {
    const { currentResults } = state;
    const {
      currentResults: { resultsCorrect, resultsIncorrect, resultsNoPenalty }
    } = state;
    const { liveResults } = state;
    const { finalResults } = state;

    if (action.type === "resultsCorrect") {
      
      
      return {
        currentResults: {
          resultsCorrect: resultsCorrect + 1,
          resultsIncorrect: resultsIncorrect,
          resultsNoPenalty: resultsNoPenalty
        },
        liveResults: {
          ...liveResults
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "resultsIncorrect") {
      return {
        currentResults: {
          resultsCorrect: resultsCorrect,
          resultsIncorrect: resultsIncorrect + 1,
          resultsNoPenalty: resultsNoPenalty
        },
        liveResults: {
          ...liveResults
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "resultsNoPenalty") {
      return {
        currentResults: {
          resultsCorrect: resultsCorrect,
          resultsIncorrect: resultsIncorrect,
          resultsNoPenalty: resultsNoPenalty + 1
        },
        liveResults: {
          ...liveResults
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "reset") {
      return {
        currentResults: {
          resultsCorrect: 0,
          resultsIncorrect: 0,
          resultsNoPenalty: 0
        },
        liveResults: {
          ...liveResults
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "setLiveResults") {
      return {
        currentResults: { ...currentResults },
        liveResults: {
          ...resultsMaker(
            resultsCorrect,
            resultsIncorrect,
            resultsNoPenalty,
            timerValue
          )
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "resetLiveResults") {
      return {
        currentResults: { ...currentResults },
        liveResults: {
          ...resultsMaker(0, 0, 0, 0)
        },
        finalResults: {
          ...finalResults
        }
      };
    } else if (action.type === "setFinalResults") {
      return {
        currentResults: { ...currentResults },
        liveResults: {
          ...liveResults
        },
        finalResults: {
          // timerValue is set to 0, because that's the proper value if the counter is finished
          // otherwise - bug - infinite number due to timerValue reseting to constantTimerValue
          ...resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty, 0)
        }
      };
    } else {
      throw new Error();
    }

    function resultsMaker(correct, incorrect, allEntries, timerValue_current) {
      // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live

      console.log("resultsMaker -> timerValue", timerValue_current);

      let noPenaltyKPM =
        Math.round(
          ((allEntries * 60) / (constantTimerValue - timerValue_current)) * 100
        ) / 100;

      let incorrectPerMinute =
        (incorrect * 60) / (constantTimerValue - timerValue_current);
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
  }

  const [state, dispatch] = useReducer(reducer, initialState); // for live results every 2s
  // disabling random wiki article button in <Fetch/>
  const disablingButton = useRef(null);

  // for displaying text
  const [myText, setMyText] = useState("[Data loading...]");
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

  // for counter=======
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;
    // let intervalForDisplay = null;

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(() => setTimerValue(t => t - 1), 1000);

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
      // clearInterval(intervalForDisplay);
    }

    if (timerValue <= 0) {
      setDisplayToReset(true);

      clearInterval(timerInterval);

      toggleActive(false);
      if (isCounterRunning) {
        setIsCounterRunning(b => !b);
      }

      setTimerValue(constantTimerValue);
      // setToReset(true);
    }

    // this equivalent to componentWillUnmount
    // "our interval would be cleared and set again whenever the count changes" (useEffect complete guite)
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [timerValue, isActive, toReset, isCounterRunning, constantTimerValue]);

  // for setting results (live & final)=====
  useEffect(() => {
    if (isActive && timerValue === constantTimerValue) {
      // for displaying 0speed & 0 accuracy if the counter becomes active
      dispatch({ type: "reset" });
      dispatch({ type: "resetLiveResults" });
      // for live results display every 2s  ==============
    } else if (isActive && timerValue % 2 === 0) {
      dispatch({ type: "setLiveResults" });
    }
    if (toReset) {
      dispatch({ type: "resetLiveResults" });
    }
    if (timerValue <= 0) {
      dispatch({ type: "setFinalResults" });
      dispatch({ type: "reset" });
      dispatch({ type: "resetLiveResults" });
    }
  }, [timerValue, isActive, toReset, constantTimerValue]);

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
      setDisplayToReset(true);
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
  // useRef focusin on textArea if the timer is active
  const focusElement = useRef(null);
  const focusTextArea = useRef(null);

  useEffect(() => {
    focusTextArea.current.setAttribute("disabled", true);
  }, []);

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
        focusTextArea={focusTextArea}
      />
      <Display
        // timer
        timerValue={timerValue}
        setTimerValue={setTimerValue}
        constantTimerValue={constantTimerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        displayToReset={displayToReset}
        setDisplayToReset={setDisplayToReset}
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
        resultsCorrect={state.resultsCorrect}
        resultsIncorrect={state.resultsIncorrect}
        resultsNoPenalty={state.resultsNoPenalty}
        myText={myText}
        wikiTitle={wikiTitle}
        setNewRandomArticle={setNewRandomArticle}
        disablingButton={disablingButton}
        isCounterRunning={isCounterRunning}
        dispatch={dispatch}
        state={state}
      />
    </div>
  );
}

export default App;
