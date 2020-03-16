
import { combineReducers } from "redux";

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
    "timer length": props.constantTimerValue
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
    isCounterRunning: false,
  },
  textDisplay: {
    displayToReset: false,
    myText: "[Data loading...]",
    wikiTitle: "",
    // newRandomArticle will be fetched if true
    newRandomArticle: true,
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
  },




  
  


};


function postReducer(state = initialState, action) {
  //mandatory, action.type is being evaluated
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case DELETE_ALL:
      return {
        ...state,
        //books state changed automatically?
        comments: action.payload
      };
    case DISPLAY_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case DELETE_BOOK:
      return {
        ...state,
        //books: [],
        //books state changed automatically?
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        //books: [],
        //books state changed automatically?
        comments: action.payload
      };

    default:
      return state;
  }
}


