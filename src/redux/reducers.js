import { combineReducers } from "redux";
// import { useCallback } from "react";

// import store from "./store.js";

// import actionTypes from "./actionTypes";

/* let {
  RESULTS_CORRECT,
  RESULTS_INCORRECT,
  RESULTS_NO_PENALTY,
  RESULTS_RESET,
  SET_LIVE_RESULTS,
  RESET_LIVE_RESULTS,
  SET_FINAL_RESULTS
} = actionTypes; */

const lengthOfSinglePart = 363;
/* const makeDefaultColoredLetters = useCallback(() => {
  let arrToReturn = [];
  for (let i = 0; i < lengthOfSinglePart; i++) {
    arrToReturn.push("DimGray");
  }
  return arrToReturn;
}, [lengthOfSinglePart]); */
//make default(gray) color in wiki display area
function makeDefaultColoredLetters() {
  let arrToReturn = [];
  for (let i = 0; i < lengthOfSinglePart; i++) {
    arrToReturn.push("DimGray");
  }
  return arrToReturn;
}

const initialState = {
  // originally from <Reducer/> component ======
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
    "timer length": 60
    // !!!!!!!!!!! 60?
    // "timer length": .counter.constantTimerValue
  },
  finalResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": ""
  },
  // originally from <App/> component ======
  counter: {
    timerValue: 60,
    constantTimerValue: 60,
    isActive: false,
    toReset: false,
    isCounterRunning: false
  },
  textDisplay: {
    displayToReset: false,
    myText: "[Data loading...]",
    wikiTitle: "",
    // newRandomArticle will be fetched if true
    newRandomArticle: true
  },
  // hints & results visibility
  componentsDisplay: {
    areHintsVisible: false,
    areResultsVisible: false
  },
  // originally from <Display/> component ======
  wikiDisplay: {
    indexOfPartialTextArr: 0,
    colorForEachLetter: makeDefaultColoredLetters()
  },
  inputArea: {
    textAreaValue: "",
    prevTextAreaValue: ""
  }
  /* refs: {
    disablingButton: useRef(null),
    focusTextArea: useRef(null)
  } */
};

function postReducer(state = initialState, action) {
  //mandatory, action.type is being evaluated

  // const { currentResults } = state;
  const {
    currentResults: { resultsCorrect, resultsIncorrect, resultsNoPenalty }
  } = state;

  const {
    componentsDisplay: { areHintsVisible, areResultsVisible }
  } = state;

  const {
    counter: {
      timerValue,
      // constantTimerValue,
      isActive,
      // toReset,
      isCounterRunning
    }
  } = state;

 /*  const {
    textDisplay: { displayToReset, myText, wikiTitle, newRandomArticle }
  } = state; */

  // const { liveResults } = state;
  // const { finalResults } = state;

  switch (action.type) {
    case "RESULTS_CORRECT":
      return {
        ...state,
        currentResults: {
          // ...store.getState().currentResults,
          ...state.currentResults,
          resultsCorrect: resultsCorrect + 1
        }
      };
    case "RESULTS_INCORRECT":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsIncorrect: resultsIncorrect + 1
        }
      };

    case "RESULTS_NO_PENALTY":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsNoPenalty: resultsNoPenalty + 1
        }
      };

    case "RESULTS_RESET":
      return {
        ...state,
        currentResults: {
          resultsCorrect: 0,
          resultsIncorrect: 0,
          resultsNoPenalty: 0
        }
      };

    case "SET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(
            state.currentResults.resultsCorrect,
            state.currentResults.resultsIncorrect,
            state.currentResults.resultsNoPenalty,
            state.counter.timerValue
          )
        }
      };

    case "RESET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(0, 0, 0, 0)
        }
      };

    case "SET_FINAL_RESULTS":
      return {
        ...state,
        finalResults: {
          // timerValue is set to 0, because that's the proper value if the counter is finished
          // otherwise - bug - infinite number due to timerValue reseting to constantTimerValue
          ...resultsMaker(
            state.currentResults.resultsCorrect,
            state.currentResults.resultsIncorrect,
            state.currentResults.resultsNoPenalty,
            0
          )
        }
      };

    case "HINTS_VISIBILITY":
      return {
        ...state,
        componentsDisplay: {
          areHintsVisible: !areHintsVisible,
          areResultsVisible: areResultsVisible
        }
      };
    case "RESULTS_VISIBILITY":
      return {
        ...state,
        componentsDisplay: {
          areHintsVisible: areHintsVisible,
          areResultsVisible: !areResultsVisible
        }
      };
    case "TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: action.payload
        }
      };

    case "TIMER_VALUE_COUNTDOWN":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: timerValue - 1
        }
      };

    case "CONSTANT_TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          constantTimerValue: action.payload
        }
      };
    case "COUNTER_RUNNING":
      return {
        ...state,
        counter: {
          ...state.counter,
          isCounterRunning: !isCounterRunning
        }
      };
    case "TOGGLE_ACTIVE":
      return {
        ...state,
        counter: {
          ...state.counter,
          isActive: !isActive
        }
      };
      case "SET_IS_ACTIVE_TO_FALSE":
        return {
          ...state,
          counter: {
            ...state.counter,
            isActive: false
          }
        };



    case "TO_RESET_TRUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: true
        }
      };

    case "TO_RESET_FALSE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: false
        }
      };

    case "DISPLAY_TO_RESET_TRUE":
      return {
        ...state,
        textDisplay: {
          ...state.textDisplay,
          displayToReset: true
        }
      };

      case "DISPLAY_TO_RESET_FALSE":
        return {
          ...state,
          textDisplay: {
            ...state.textDisplay,
            displayToReset: false
          }
        };

    // fetch only
    case "MY_TEXT":
      return {
        ...state,
        textDisplay: {
          ...state.textDisplay,
          myText: action.payload
        }
      };

    case "WIKI_TITLE":
      return {
        ...state,
        textDisplay: {
          ...state.textDisplay,
          wikiTitle: action.payload
        }
      };

      case "RANDOM_ARTICLE_TRUE":
        return {
          ...state,
          textDisplay: {
            ...state.textDisplay,
            newRandomArticle: true
          }
        };
  

    case "RANDOM_ARTICLE_FALSE":
      return {
        ...state,
        textDisplay: {
          ...state.textDisplay,
          newRandomArticle: false
        }
      };

    // display only

    case "INDEX_OF_PARTIAL_TEXTARR":
      return {
        ...state,
        wikiDisplay: {
          ...state.wikiDisplay,
          indexOfPartialTextArr: action.payload
        }
      };

    case "COLOR_FOR_EACH_LETTER":
      return {
        ...state,
        wikiDisplay: {
          ...state.wikiDisplay,
          colorForEachLetter: action.payload
        }
      };

    case "TEXT_AREA_VALUE":
      return {
        ...state,
        inputArea: {
          // !!!! You may not call store.getState() while the reducer is executing. 
          ...state.inputArea,
          textAreaValue: action.payload
        }
      };

    case "PREV_TEXT_AREA_VALUE":
      return {
        ...state,
        inputArea: {
          ...state.inputArea,
          prevTextAreaValue: action.payload
        }
      };

    default:
      return state;
  }

  function resultsMaker(correct, incorrect, allEntries, timerValue_current) {
    // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live

    // console.log("resultsMaker -> timerValue", timerValue_current);

    let noPenaltyKPM =
      Math.round(
        ((allEntries * 60) /
          (state.counter.constantTimerValue - timerValue_current)) *
          100
      ) / 100;

    let incorrectPerMinute =
      (incorrect * 60) /
      (state.counter.constantTimerValue - timerValue_current);
    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

    return {
      speed: calcSpeed(),
      accuracy: calcAccuracy(),
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenaltyKPM,
      "timer length": state.counter.constantTimerValue.toString()
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

//object with reducers, ??? - arbitrary
export default combineReducers({
  totalState: postReducer
});
