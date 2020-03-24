import React from "react";
import { useEffect, useRef, useCallback } from "react";

import "./App.css";
import Fetch from "./components/Fetch.js";
import Display from "./components/Display.js";
// import Reducer from "./components/Reducer.js";

import { connect } from "react-redux";

import loremText from "./components/_defaultText.js";
//!!!!! imported actions creators must be passed here as props
function App({
  // state
  //  from mapStateToProps
  timerValue,
  constantTimerValue,
  isActive,
  toReset,
  isCounterRunning,
  displayToReset,
  myText,
  wikiTitle,
  newRandomArticle,
  setNewRandomArticle_true,
  setNewRandomArticle_false,
  areHintsVisible,
  areResultsVisible,
  // from mapDispatchToProps
  setAreHintsVisible,
  setAreResultsVisible,
  resultsReset,
  setLiveResults,
  resetLiveResults,
  setFinalResults,
  setTimerValue,
  setTimerValueCountdown,

  setIsCounterRunning,
  toggleActive,
  setIsActiveToFalse,

  setToReset_true,
  setToReset_false,
  setDisplayToReset_true,
  // setDisplayToReset_false,
  setConstantTimerValue

  // dipatch
}) {
  // const [timerValue, setTimerValue] = useState(60);
  // const [constantTimerValue, setConstantTimerValue] = useState(60);

  // for start/pause button
  // const [isActive, toggleActive] = useState(false);
  // for reset button
  // const [toReset, setToReset] = useState(false);
  // reseting display if reset btn is clicked or if Timer runs out
  // const [displayToReset, setDisplayToReset] = useState(false);

  // is the counter running
  // const [isCounterRunning, setIsCounterRunning] = useState(false);

  // disabling random wiki article button in <Fetch/>

  const disablingButton = useRef(null);

  // for displaying text
  // const [myText, setMyText] = useState("[Data loading...]");
  // const [wikiTitle, setWikiTitle] = useState("");
  // newRandomArticle will be fetched if true
  // const [newRandomArticle, setNewRandomArticle] = useState(true);

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  });

  // hints & results visibility
  // const [areHintsVisible, setAreHintsVisible] = useState(false);
  // const [areResultsVisible, setAreResultsVisible] = useState(false);

  function toggleHints() {
    if (!isActive) {
      // setAreHintsVisible(!areHintsVisible);
      // setAreHintsVisible(h => !h);
      // dispatch({ type: "HINTS_VISIBILITY" });
      setAreHintsVisible();
    }
  }

  // for turning results off when the timer is running  =========
  //useCallback is used so useEffect below won't run on every every time toggleResults function is called
  const toggleResults = useCallback(() => {
    // functional update(r=>!r) so the useCallback don't depend on areResultsVisible
    setAreResultsVisible();
    // setAreResultsVisible(r => !r);
  }, [
    //
    setAreResultsVisible
  ]);

  useEffect(() => {
    if (isActive && timerValue > 0 && areResultsVisible) {
      toggleResults();
    }

    if (!areResultsVisible && timerValue <= 0) {
      toggleResults();
    }
  }, [
    isActive,
    timerValue,
    areResultsVisible,
    toggleResults,
    //
    setAreResultsVisible
  ]);

  // for counter=======
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;
    // let intervalForDisplay = null;

    if (isActive && timerValue > 0) {
      // timerInterval = setInterval(() => setTimerValue(t => t - 1), 1000);
      timerInterval = setInterval(() => setTimerValueCountdown(), 1000);

      if (!isCounterRunning) {
        // setIsCounterRunning(b => !b);
        setIsCounterRunning();
      }
    }

    if (toReset) {
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      // shoul be named setActivate
      // toggleActive(false);
      setIsActiveToFalse();

      if (isCounterRunning) {
        // setIsCounterRunning(b => !b);
        setIsCounterRunning();
      }

      // setToReset(false);
      setToReset_false();
      // setIsActiveToFalse();
    }
    // turning interval off on pause
    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
      // clearInterval(intervalForDisplay);
    }

    if (timerValue <= 0) {
      // setDisplayToReset(true);
      setDisplayToReset_true();

      clearInterval(timerInterval);

      // toggleActive(false);
      setIsActiveToFalse();
      if (isCounterRunning) {
        // setIsCounterRunning(b => !b);
        setIsCounterRunning();
      }

      setTimerValue(constantTimerValue);
      // setToReset(true);
    }

    // this equivalent to componentWillUnmount
    // "our interval would be cleared and set again whenever the count changes" (useEffect complete guite)
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [
    timerValue,
    isActive,
    toReset,
    isCounterRunning,
    constantTimerValue,
    //
    setDisplayToReset_true,
    setIsCounterRunning,
    setTimerValue,
    setTimerValueCountdown,
    setToReset_false,
    toggleActive,
    setIsActiveToFalse
  ]);

  // for pause button
  function toggleTimer() {
    // toggleActive(!isActive);
    toggleActive();
  }

  // for time select
  function setTimerOnSelect(e) {
    setTimerValue(e.target.value);
    setConstantTimerValue(e.target.value);
  }

  function resetTimer() {
    // if (timerValue !== constantTimerValue) {
    if (isCounterRunning) {
      // setToReset(true);
      setToReset_true();
      // setDisplayToReset(true);
      setDisplayToReset_true();
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

  // =========================================== from <Fetch/> components
  // for setting results (live & final)=====
  // let { isActive, timerValue, constantTimerValue, toReset } = props;
  useEffect(() => {
    if (isActive && timerValue === constantTimerValue) {
      // for displaying 0speed & 0 accuracy if the counter becomes active
      // dispatch({ type: "reset" });
      // dispatch({ type: "resetLiveResults" });
      resultsReset();
      resetLiveResults();

      // for live results display every 2s  ==============
    } else if (isActive && timerValue % 2 === 0) {
      // dispatch({ type: "setLiveResults" });
      setLiveResults();
    }
    if (toReset) {
      // dispatch({ type: "resetLiveResults" });
      resetLiveResults();
    }
    if (timerValue <= 0) {
      setFinalResults();
      resultsReset();
      resetLiveResults();
      // dispatch({ type: "setFinalResults" });
      // dispatch({ type: "reset" });
      // dispatch({ type: "resetLiveResults" });
    }
  }, [
    timerValue,
    isActive,
    toReset,
    constantTimerValue,
    //
    resetLiveResults,
    resultsReset,
    setFinalResults,
    setLiveResults
  ]);
  // ===========================================

  return (
    <div className="App" onKeyDown={handleKeyPress}>
      <Fetch
        myText={myText}
        // setMyText={setMyText}
        wikiTitle={wikiTitle}
        // setWikiTitle={setWikiTitle}
        setNewRandomArticle_false={setNewRandomArticle_false}
        // setNewRandomArticle={setNewRandomArticle}
        disablingButton={disablingButton}
        loremText={loremText}
        focusTextArea={focusTextArea}
      />

      {/* <Reducer */}
      <Display
        // timer
        timerValue={timerValue}
        // setTimerValue={setTimerValue}
        constantTimerValue={constantTimerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        displayToReset={displayToReset}
        // setDisplayToReset={setDisplayToReset}
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
        myText={myText}
        wikiTitle={wikiTitle}
        disablingButton={disablingButton}
        isCounterRunning={isCounterRunning}
        // setNewRandomArticle={setNewRandomArticle}

        // for Display => WikiController
        setNewRandomArticle_true={setNewRandomArticle_true}
        // for Fetch
        setNewRandomArticle_false={setNewRandomArticle_false}

        // dispatch={dispatch}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    //  !!!! total state from reducers.js combineReducers at the end
    timerValue: state.totalState.counter.timerValue, // (1)
    constantTimerValue: state.totalState.counter.constantTimerValue, // (1)
    isActive: state.totalState.counter.isActive, // (1)
    toReset: state.totalState.counter.toReset, // (1)
    isCounterRunning: state.totalState.counter.isCounterRunning, // (1)
    displayToReset: state.totalState.textDisplay.displayToReset,
    myText: state.totalState.textDisplay.myText,
    wikiTitle: state.totalState.textDisplay.wikiTitle,
    newRandomArticle: state.totalState.textDisplay.newRandomArticle,
    // hints & results
    areHintsVisible: state.totalState.componentsDisplay.areHintsVisible,
    areResultsVisible: state.totalState.componentsDisplay.areResultsVisible
    // disablingButton: state.totalState.refs.disablingButton,
    // focusTextArea: state.totalState.refs.focusTextArea,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions for Display delete later
    resultsCorrect: () => dispatch({ type: "RESULTS_CORRECT" }),
    resultsIncorrect: () => dispatch({ type: "RESULTS_INCORRECT" }),
    resultsNoPenalty: () => dispatch({ type: "RESULTS_NO_PENALTY" }),

    resultsReset: () => dispatch({ type: "RESULTS_RESET" }),
    setLiveResults: () => dispatch({ type: "SET_LIVE_RESULTS" }),
    resetLiveResults: () => dispatch({ type: "RESET_LIVE_RESULTS" }),
    setFinalResults: () => dispatch({ type: "SET_FINAL_RESULTS" }),

    // from fetch, delete later?
    setMyText: data => dispatch({ type: "MY_TEXT", payload: data }),
    setWikiTitle: data => dispatch({ type: "WIKI_TITLE", payload: data }),

    // fetch & wikiController
    setNewRandomArticle_false: () => dispatch({ type: "RANDOM_ARTICLE_FALSE" }),

    // wikiController from Display
    setNewRandomArticle_true: () => dispatch({ type: "RANDOM_ARTICLE_TRUE" }),

    // for App
    setDisplayToReset_true: () => dispatch({ type: "DISPLAY_TO_RESET_TRUE" }),
    //

    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    setIsActiveToFalse: () => dispatch({ type: "SET_IS_ACTIVE_TO_FALSE" }),
    setTimerValue: data => dispatch({ type: "TIMER_VALUE", payload: data }),
    setTimerValueCountdown: data =>
      dispatch({ type: "TIMER_VALUE_COUNTDOWN", payload: data }),

    setConstantTimerValue: data =>
      dispatch({ type: "CONSTANT_TIMER_VALUE", payload: data }),

    setToReset_true: () => dispatch({ type: "TO_RESET_TRUE" }),
    setToReset_false: () => dispatch({ type: "TO_RESET_FALSE" }),
    setIsCounterRunning: () => dispatch({ type: "COUNTER_RUNNING" }),

    setAreHintsVisible: () => dispatch({ type: "HINTS_VISIBILITY" }),
    setAreResultsVisible: () => dispatch({ type: "RESULTS_VISIBILITY" }),

    // for display only, delete later
    setIndexOfPartialTextArr: data =>
      dispatch({ type: "INDEX_OF_PARTIAL_TEXTARR", payload: data }),
    setTextAreaValue: data =>
      dispatch({ type: "TEXT_AREA_VALUE", payload: data }),
    setPrevTextAreaValue: data =>
      dispatch({ type: "TEXT_AREA_VALUE", payload: data }),
    setColorForEachLetter: data =>
      dispatch({ type: "COLOR_FOR_EACH_LETTER", payload: data }),
    setDisplayToReset_false: () => dispatch({ type: "DISPLAY_TO_RESET_FALSE" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(App); // (3)
