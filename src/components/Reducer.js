import React from "react";
import { useEffect, useReducer } from "react";
import Display from "./Display.js";

function Reducer(props) {
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
      "timer length": props.constantTimerValue
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

  // for live results & setting <Result/> when the run is finished
  const [state, dispatch] = useReducer(reducer, initialState); // for live results every 2s
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
            props.timerValue
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

      // console.log("resultsMaker -> timerValue", timerValue_current);

      let noPenaltyKPM =
        Math.round(
          ((allEntries * 60) /
            (props.constantTimerValue - timerValue_current)) *
            100
        ) / 100;

      let incorrectPerMinute =
        (incorrect * 60) / (props.constantTimerValue - timerValue_current);
      // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
      let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

      return {
        speed: calcSpeed(),
        accuracy: calcAccuracy(),
        correct: correct,
        incorrect: incorrect,
        noPenalty: noPenaltyKPM,
        "timer length": props.constantTimerValue.toString()
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

  // for setting results (live & final)=====
  let { isActive, timerValue, constantTimerValue, toReset } = props;
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

  return (
    <Display
      //from reducer
      resultsCorrect={state.resultsCorrect}
      resultsIncorrect={state.resultsIncorrect}
      resultsNoPenalty={state.resultsNoPenalty}
      dispatch={dispatch}
      state={state}
      // timer
      timerValue={props.timerValue}
      setTimerValue={props.setTimerValue}
      constantTimerValue={props.constantTimerValue}
      toggleTimer={props.toggleTimer}
      setTimerOnSelect={props.setTimerOnSelect}
      isActive={props.isActive}
      resetTimer={props.resetTimer}
      toReset={props.toReset}
      displayToReset={props.displayToReset}
      setDisplayToReset={props.setDisplayToReset}
      // hints & results visibility
      areHintsVisible={props.areHintsVisible}
      areResultsVisible={props.areResultsVisible}
      toggleHints={props.toggleHints}
      toggleResults={props.toggleResults}
      // disabling select, menaging focus
      isDisabled={props.isDisabled}
      focusTextArea={props.focusTextArea}
      putFocusOnTextArea={props.putFocusOnTextArea}
      focusElement={props.focusElement}
      // results
      myText={props.myText}
      wikiTitle={props.wikiTitle}
      setNewRandomArticle={props.setNewRandomArticle}
      disablingButton={props.disablingButton}
      isCounterRunning={props.isCounterRunning}
    />
  );
}

export default Reducer;
