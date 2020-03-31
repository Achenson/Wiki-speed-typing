import { combineReducers } from "redux";

// import store from "./store.js";
// import actionTypes from "./actionTypes";

const lengthOfSinglePart = 363;
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
  },
  finalResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": ""
  },

  // for Stats
  stats: {
    five_s: [
      [1, 11],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],

    thirty_s: [
      [2, 22],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],

    one_min: [
      [3, 33],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],

    two_min: [
      [4, 44],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    five_min: [
      [5, 55],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
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
    areResultsVisible: false,
    areStatsVisible: false
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
  // top score
};

function postReducer(state = initialState, action) {
  const {
    currentResults: { resultsCorrect, resultsIncorrect, resultsNoPenalty }
  } = state;

  const {
    componentsDisplay: { areHintsVisible, areResultsVisible, areStatsVisible }
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

  switch (action.type) {
    case "RESULTS_CORRECT":
      return {
        ...state,
        currentResults: {
          // ...store.getState().currentResults, <- wrong!!! reducer function
          // already got state
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

    // for Stats

    case "UPDATE_STATS":

      let finalResultObj = {...resultsMaker(
        state.currentResults.resultsCorrect,
        state.currentResults.resultsIncorrect,
        state.currentResults.resultsNoPenalty,
        0
      )}

      let statsStateKey;

      switch (finalResultObj["timer length"]) {
        case "5":
          // setCurrentTimer(five_s);
          statsStateKey = "five_s";
          break;
        case "30":
          // setCurrentTimer(thirty_s);
          statsStateKey = "thirty_s";
          break;
        case "60":
          // setCurrentTimer(one_min);
          statsStateKey = "one_min";
          break;
        case "120":
          // setCurrentTimer(two_min);
          statsStateKey = "two_min";
          break;
        case "300":
          // setCurrentTimer(five_min);
          statsStateKey = "five_min";
          break;

        default:
          statsStateKey = "one_min";
      }

      console.log("statsStateKey");

      console.log(statsStateKey);

      let upd = updateAndSort(
        /* state.totalState.finalResults["timer length"],
        store.getState().totalState.finalResults.speed,
        store.getState().totalState.finalResults.accuracy */
        state.stats[statsStateKey],
        finalResultObj.speed,
        finalResultObj.accuracy
      );

      return {
        ...state,
        stats: {
          ...state.stats,
          [statsStateKey]: [
            upd[0],
            upd[1],
            upd[2],
            upd[3],
            upd[4],
            upd[5],
            upd[6],
            upd[7],
            upd[8],
            upd[9]
          ]
        }

        // [action.payload.timerLenght]: [...action.payload.data]
      };

    // ========================================

    case "HINTS_VISIBILITY":
      return {
        ...state,
        componentsDisplay: {
          areHintsVisible: !areHintsVisible,
          areResultsVisible: areResultsVisible,
          areStatsVisible: areStatsVisible
        }
      };
    case "RESULTS_VISIBILITY":
      return {
        ...state,
        componentsDisplay: {
          areHintsVisible: areHintsVisible,
          areResultsVisible: !areResultsVisible,
          areStatsVisible: areStatsVisible
        }
      };
    case "STATS_VISIBILITY":
      return {
        ...state,
        componentsDisplay: {
          areHintsVisible: areHintsVisible,
          areResultsVisible: areResultsVisible,
          areStatsVisible: !areStatsVisible
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

  function updateAndSort(arr, speed, accuracy) {
    let finalArr = [];
    let arrToAdd = [speed, accuracy];

    arr.push(arrToAdd);
    arr.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      } else {
        return b[0] - a[0];
      }
    });

    console.log("arr length");
    console.log(arr.length);

    

    console.log(arr[0][0], arr[0][1]);
    console.log(arr[1][0], arr[1][1]);

    for (let i = 0; i < 10; i++) {
      finalArr.push(arr[i]);
    }

    console.log("finalArr length");
    console.log(finalArr.length);
    return finalArr;
  }
}

//object with reducers, totalState - arbitrary
export default combineReducers({
  totalState: postReducer
  // statsState: statsReducer
});
