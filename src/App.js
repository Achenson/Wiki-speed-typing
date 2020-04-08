import React from "react";
import { useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";

// import store from "./store.js";
import "./App.css";
import Fetch from "./components/Fetch.js";
import Display from "./components/Display.js";
import loremText from "./components/_defaultText.js";

import Login from "./components_links/Login.js";
import Register from "./components_links/Register.js";
import testComponent from "./components_links/testComponent.js";

import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

//!!!!! imported actions creators must be passed here as props
function App({
  //  from mapStateToProps
  timerValue,
  constantTimerValue,
  isActive,
  toReset,
  isCounterRunning,
  displayToReset,
  myText,
  wikiTitle,
  setNewRandomArticle_true,
  setNewRandomArticle_false,
  areHintsVisible,
  areResultsVisible,
  areStatsVisible,
  // from mapDispatchToProps
  toggleAreHintsVisible,
  toggleAreResultsVisible,
  toggleAreStatsVisible,
  resultsReset,
  setLiveResults,
  resetLiveResults,
  setFinalResults,

  setTimerValue,
  setTimerValueCountdown,
  toggleIsCounterRunning,
  toggleActive,
  setIsActiveToFalse,
  setToReset_true,
  setToReset_false,
  setDisplayToReset_true,
  setConstantTimerValue,
  // for Stats
  setStats,
  setCurrentStatsKey,
}) {
  // disabling random wiki article button in <Fetch/>
  const disablingButton = useRef(null);

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  });

  // display

  function toggleStats() {
    if (!isActive) {
      // toggleAreHintsVisible(h => !h);
      toggleAreStatsVisible();
    }
  }

  function toggleHints() {
    if (!isActive) {
      // toggleAreHintsVisible(h => !h);
      toggleAreHintsVisible();
    }
  }

  // for turning results off when the timer is running  =========
  //useCallback is used so useEffect below won't run on every every time toggleResults function is called
  const toggleResults = useCallback(() => {
    // functional update(r=>!r) so the useCallback don't depend on areResultsVisible
    // toggleAreResultsVisible(r => !r);
    toggleAreResultsVisible();
  }, [toggleAreResultsVisible]);

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
    toggleAreResultsVisible,
  ]);

  // for counter=======
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;

    if (isActive && timerValue > 0) {
      // timerInterval = setInterval(() => setTimerValue(t => t - 1), 1000);
      timerInterval = setInterval(() => setTimerValueCountdown(), 1000);

      if (!isCounterRunning) {
        // toggleIsCounterRunning(b => !b);
        toggleIsCounterRunning();
      }
    }

    if (toReset) {
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setIsActiveToFalse();

      if (isCounterRunning) {
        // toggleIsCounterRunning(b => !b);
        toggleIsCounterRunning();
      }

      // setToReset(false);
      setToReset_false();
    }
    // turning interval off on pause
    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
    }

    if (timerValue <= 0) {
      setDisplayToReset_true();
      clearInterval(timerInterval);
      setIsActiveToFalse();

      if (isCounterRunning) {
        // toggleIsCounterRunning(b => !b);
        toggleIsCounterRunning();
      }

      setTimerValue(constantTimerValue);
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
    setDisplayToReset_true,
    toggleIsCounterRunning,
    setTimerValue,
    setTimerValueCountdown,
    setToReset_false,
    toggleActive,
    setIsActiveToFalse,
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
    // for Stats
    setCurrentStatsKey(e.target.value);
  }

  function resetTimer() {
    // if (timerValue !== constantTimerValue) {
    if (isCounterRunning) {
      setToReset_true();
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

  // for setting results (live & final)=====
  useEffect(() => {
    if (isActive && timerValue === constantTimerValue) {
      // for displaying 0speed & 0 accuracy if the counter becomes active
      resultsReset();
      resetLiveResults();

      // for live results display every 2s  ==============
    } else if (isActive && timerValue % 2 === 0) {
      setLiveResults();
    }
    if (toReset) {
      resetLiveResults();
    }
    if (timerValue <= 0) {
      setFinalResults();

      setStats();

      resultsReset();

      resetLiveResults();
    }
  }, [
    timerValue,
    isActive,
    toReset,
    constantTimerValue,
    resetLiveResults,
    resultsReset,
    setFinalResults,
    setLiveResults,
    setStats,
  ]);
  // ===========================================

  return (
    <BrowserRouter>
      <div className="App" onKeyDown={handleKeyPress}>
        <Fetch
          myText={myText}
          wikiTitle={wikiTitle}
          setNewRandomArticle_false={setNewRandomArticle_false}
          disablingButton={disablingButton}
          loremText={loremText}
          focusTextArea={focusTextArea}
        />
        {/* <Display
        // timer
        timerValue={timerValue}
        constantTimerValue={constantTimerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        displayToReset={displayToReset}
        // hints & results visibility
        areHintsVisible={areHintsVisible}
        areResultsVisible={areResultsVisible}
        areStatsVisible={areStatsVisible}
        toggleHints={toggleHints}
        toggleResults={toggleResults}
        toggleStats={toggleStats}
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
        // for Display => WikiController
        setNewRandomArticle_true={setNewRandomArticle_true}
        // for Fetch
        setNewRandomArticle_false={setNewRandomArticle_false}
      /> */}
        <Switch>
          {/* <Route path="/" exact component={Display}/> */}
          <Route
            path="/"
            exact
            render={() => (
              <Display
                // {...props}
                // timer
                timerValue={timerValue}
                constantTimerValue={constantTimerValue}
                toggleTimer={toggleTimer}
                setTimerOnSelect={setTimerOnSelect}
                isActive={isActive}
                resetTimer={resetTimer}
                toReset={toReset}
                displayToReset={displayToReset}
                // hints & results visibility
                areHintsVisible={areHintsVisible}
                areResultsVisible={areResultsVisible}
                areStatsVisible={areStatsVisible}
                toggleHints={toggleHints}
                toggleResults={toggleResults}
                toggleStats={toggleStats}
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
                // for Display => WikiController
                setNewRandomArticle_true={setNewRandomArticle_true}
                // for Fetch
                setNewRandomArticle_false={setNewRandomArticle_false}
              />
            )}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    //  !!!! totalState is from reducers.js combineReducers at the end
    timerValue: state.resultsAndTimerState.counter.timerValue, // (1)
    constantTimerValue: state.resultsAndTimerState.counter.constantTimerValue, // (1)
    isActive: state.resultsAndTimerState.counter.isActive, // (1)
    toReset: state.resultsAndTimerState.counter.toReset, // (1)
    isCounterRunning: state.resultsAndTimerState.counter.isCounterRunning, // (1)
    displayToReset: state.displayState.textDisplay.displayToReset,
    myText: state.displayState.textDisplay.myText,
    wikiTitle: state.displayState.textDisplay.wikiTitle,
    newRandomArticle: state.displayState.textDisplay.newRandomArticle,
    // hints & results
    /* areHintsVisible: state.totalState.componentsDisplay.areHintsVisible,
    areResultsVisible: state.totalState.componentsDisplay.areResultsVisible,
    areStatsVisible: state.totalState.componentsDisplay.areStatsVisible */
    areHintsVisible: state.visibilityState.areHintsVisible,
    areResultsVisible: state.visibilityState.areResultsVisible,
    areStatsVisible: state.visibilityState.areStatsVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //  resultsCorrect, resultsIncorrect, resultsNoPenalty in for <Display>,
    // here deleted

    resultsReset: () => dispatch({ type: "RESULTS_RESET" }),
    setLiveResults: () => dispatch({ type: "SET_LIVE_RESULTS" }),
    resetLiveResults: () => dispatch({ type: "RESET_LIVE_RESULTS" }),
    setFinalResults: () => dispatch({ type: "SET_FINAL_RESULTS" }),

    //setMyText & setWikiTitle in <Fetch/> only, here deleted

    // fetch & wikiController
    setNewRandomArticle_false: () => dispatch({ type: "RANDOM_ARTICLE_FALSE" }),

    // wikiController from Display
    setNewRandomArticle_true: () => dispatch({ type: "RANDOM_ARTICLE_TRUE" }),

    // for App
    setDisplayToReset_true: () => dispatch({ type: "DISPLAY_TO_RESET_TRUE" }),
    //

    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    setIsActiveToFalse: () => dispatch({ type: "SET_IS_ACTIVE_TO_FALSE" }),
    setTimerValue: (data) => dispatch({ type: "TIMER_VALUE", payload: data }),
    setTimerValueCountdown: (data) =>
      dispatch({ type: "TIMER_VALUE_COUNTDOWN", payload: data }),

    setConstantTimerValue: (data) =>
      dispatch({ type: "CONSTANT_TIMER_VALUE", payload: data }),

    setToReset_true: () => dispatch({ type: "TO_RESET_TRUE" }),
    setToReset_false: () => dispatch({ type: "TO_RESET_FALSE" }),
    toggleIsCounterRunning: () => dispatch({ type: "COUNTER_RUNNING" }),

    toggleAreHintsVisible: () => dispatch({ type: "HINTS_VISIBILITY" }),
    toggleAreResultsVisible: () => dispatch({ type: "RESULTS_VISIBILITY" }),
    toggleAreStatsVisible: () => dispatch({ type: "STATS_VISIBILITY" }),

    // setIndexOfPartialTextArr, setTextAreaValue, setPrevTextAreaValue,
    //  setColorForEachLetter, setDisplayToReset_false for <Display only/>,
    //  here deleted

    // for Stats
    setStats: () => dispatch({ type: "UPDATE_STATS" }),
    // for synchronizing select timer with select from Stats
    setCurrentStatsKey: (data) =>
      dispatch({ type: "SET_CURRENT_STATS", payload: data }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(App);
