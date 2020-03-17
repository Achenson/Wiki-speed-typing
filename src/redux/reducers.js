import { combineReducers } from "redux";
import { useCallback } from "react";

import actionTypes from "./actionTypes";
let {
  RESULTS_CORRECT,
  RESULTS_INCORRECT,
  RESULTS_NO_PENALTY,
  RESULTS_RESET,
  SET_LIVE_RESULTS,
  RESET_LIVE_RESULTS,
  SET_FINAL_RESULTS
} = actionTypes;

const lengthOfSinglePart = 363;
//make default(gray) color in wiki display area
const makeDefaultColoredLetters = useCallback(() => {
  let arrToReturn = [];
  for (let i = 0; i < lengthOfSinglePart; i++) {
    arrToReturn.push("DimGray");
  }
  return arrToReturn;
}, [lengthOfSinglePart]);

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
    // !!!!!!!!!!! 60?
    "timer length": this.counter.constantTimerValue
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
};

function postReducer(state = initialState, action) {
  //mandatory, action.type is being evaluated

  // const { currentResults } = state;
  const {
    currentResults: { resultsCorrect, resultsIncorrect, resultsNoPenalty }
  } = state;
  // const { liveResults } = state;
  // const { finalResults } = state;

  switch (action.type) {
    case RESULTS_CORRECT:
      return {
        ...state,
        resultsCorrect: resultsCorrect + 1,
        resultsIncorrect: resultsIncorrect,
        resultsNoPenalty: resultsNoPenalty
      };
    case RESULTS_INCORRECT:
      return {
        ...state,
        resultsCorrect: resultsCorrect,
        resultsIncorrect: resultsIncorrect + 1,
        resultsNoPenalty: resultsNoPenalty
      };

    case RESULTS_NO_PENALTY:
      return {
        ...state,
        resultsCorrect: resultsCorrect,
        resultsIncorrect: resultsIncorrect,
        resultsNoPenalty: resultsNoPenalty + 1
      };

    case RESULTS_RESET:
      return {
        ...state,
        resultsCorrect: 0,
        resultsIncorrect: 0,
        resultsNoPenalty: 0
      };

    case SET_LIVE_RESULTS:
      return {
        ...state,
        liveResults: {
          ...resultsMaker(
            resultsCorrect,
            resultsIncorrect,
            resultsNoPenalty,
            state.counter.timerValue
          )
        }
      };

    case RESET_LIVE_RESULTS:
      return {
        ...state,
        liveResults: {
          ...resultsMaker(0, 0, 0, 0)
        }
      };

    case SET_FINAL_RESULTS:
      return {
        ...state,
        finalResults: {
          // timerValue is set to 0, because that's the proper value if the counter is finished
          // otherwise - bug - infinite number due to timerValue reseting to constantTimerValue
          ...resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty, 0)
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
