import React from "react";
import { useState, useEffect, useCallback } from "react";
// import SingleLetter from "./SingleLetter.js";
import { connect } from "react-redux";



import WikiController from "./WikiController.js";
import Hints from "./Hints.js";
import UpperUI from "./UpperUI.js";
import WikiDisplay from "./WikiDisplay.js";
import InputArea from "./InputArea.js";
import Controls from "./Controls.js";
import ResultsButton from "./ResultsButton.js";
import Results from "./Results.js";



// const escapeStringRegexp = require("escape-string-regexp");

function Display({



  myText,
  displayToReset,
  setDisplayToReset,


  resultsCorrect,
  resultsIncorrect,
  resultsNoPenalty,

  setIndexOfPartialTextArr,
  setTextAreaValue,
  setPrevTextAreaValue,
  setColorForEachLetter,

  textAreaValue,
    prevTextAreaValue,
    indexOfPartialTextArr,
    colorForEachLetter,
    liveResults,
    finalResults,

    areResultsVisible,
    focusElement,
    toggleResults,
    isCounterRunning,
    resetTimer,
    isActive,
    disablingButton,
    setNewRandomArticle,
    wikiTitle,
    putFocusOnTextArea,
    isDisabled,
    setTimerOnSelect,
    toggleTimer,
    toggleHints,
    areHintsVisible,
    focusTextArea,
    timerValue




}) {
  // rendering text ============================
  const lengthOfSinglePart = 363;

  let myTextToArr = myText.split("");
  let textDividedByLength_floor = Math.floor(
    myTextToArr.length / lengthOfSinglePart
  );

  let arrOfPartialText = makeArrOfPartialText(lengthOfSinglePart, myTextToArr);
  // const [indexOfPartialTextArr, setIndexOfPartialTextArr] = useState(0);
  const textToRender = arrOfPartialText[indexOfPartialTextArr];
  let arrOutOfText = textToRender.split("");

  //make default(gray) color in wiki display area
  const makeDefaultColoredLetters = useCallback(() => {
    let arrToReturn = [];
    for (let i = 0; i < lengthOfSinglePart; i++) {
      arrToReturn.push("DimGray");
    }
    return arrToReturn;
  }, [lengthOfSinglePart]);

  /* const [colorForEachLetter, setColorForEachLetter] = useState(
    // setting gray color for each letter by default
    makeDefaultColoredLetters()
  ); */

  // const [textAreaValue, setTextAreaValue] = useState("");
  // const [prevTextAreaValue, setPrevTextAreaValue] = useState("");

  //coloring letters in display according to errors or no
  //  + counting entries!!

  // let { dispatch } = props;

  useEffect(() => {

    let arrOutOfTextValue = textAreaValue.split("");
    // console.log("arrOutOfTextValue");
    // console.log(arrOutOfTextValue);

    // for correct, incorrect, allEntries
    if (textAreaValue.length > prevTextAreaValue.length) {
      let colorForEachLetter_2 = [...colorForEachLetter];

      // dispatch({ type: "resultsNoPenalty" });
      resultsNoPenalty() 
      // mapresultsCorrect();

      if (
        textAreaValue[textAreaValue.length - 1] ===
        arrOutOfText[textAreaValue.length - 1]
      ) {
        // dispatch({ type: "resultsCorrect" });
        resultsCorrect() 
        colorForEachLetter_2[textAreaValue.length - 1] = "blue";
      }
      
      if (
        textAreaValue[textAreaValue.length - 1] !==
        arrOutOfText[textAreaValue.length - 1]
        ) {
          
          resultsIncorrect() 
        // dispatch({ type: "resultsIncorrect" });
        colorForEachLetter_2[textAreaValue.length - 1] = "red";
      }

      setColorForEachLetter([...colorForEachLetter_2]);

      if (textAreaValue.length === textToRender.length) {
        // e.target.value = "";
        setTextAreaValue("");

        if (indexOfPartialTextArr < textDividedByLength_floor) {
          setColorForEachLetter(makeDefaultColoredLetters());
          setIndexOfPartialTextArr(
            indexOfPartialTextArr => indexOfPartialTextArr + 1
          );
        } else {
          setColorForEachLetter(makeDefaultColoredLetters());
          setIndexOfPartialTextArr(0);
        }
      }
    }

    if (textAreaValue.length < prevTextAreaValue.length) {
      let colorForEachLetter_3 = [...colorForEachLetter];
      colorForEachLetter_3[textAreaValue.length] = "DimGray";
      setColorForEachLetter([...colorForEachLetter_3]);
    }

    setPrevTextAreaValue(textAreaValue);
  }, [
    textAreaValue,
    prevTextAreaValue.length,
    // dispatch,
    colorForEachLetter,
    arrOutOfText,
    indexOfPartialTextArr,
    textDividedByLength_floor,
    textToRender.length,
    makeDefaultColoredLetters
  ]);

  // reseting display
  // let { displayToReset, setDisplayToReset } = props;
  useEffect(() => {
    if (displayToReset) {
      resetDisplay();
      // setDisplayToReset(false);
      setDisplayToReset(false);
    }

    function resetDisplay() {
      setTextAreaValue("");
      setIndexOfPartialTextArr(0);
      setColorForEachLetter(makeDefaultColoredLetters());
    }
  }, [displayToReset, makeDefaultColoredLetters, setDisplayToReset]);

  // arrToRender = [ [letter, color for the letter], ... ]
  const arrToRender = makeArrayToRender();

  function makeArrOfPartialText(lengthOfSinglePart, myTextToArr) {
    let arrOfPartialText = [];
    //let myTextToArr = text.split("");

    for (let i = 0; i <= textDividedByLength_floor; i++) {
      let newArr = [];
      for (
        let j = i * lengthOfSinglePart;
        j < lengthOfSinglePart + i * lengthOfSinglePart;
        j++
      ) {
        newArr.push(myTextToArr[j]);
      }

      let joinedNewArr = newArr.join("");

      arrOfPartialText.push(joinedNewArr);
    }

    //console.log(arrOfPartialText);
    return arrOfPartialText;
  }

  function makeArrayToRender() {
    let arrToSet = [];
    for (let i = 0; i < arrOutOfText.length; i++) {
      let newArr = [];
      newArr.push(arrOutOfText[i]);
      newArr.push(colorForEachLetter[i]);
      arrToSet.push(newArr);
    }

    return arrToSet;
  }

  function changeTextAreaValue(e) {
    setTextAreaValue(e.target.value);
  }

  // for "..." displaying at the end of wiki-diplay
  let ellipsis = "...";
  return (
    <div className="outer-container">
      <Hints areHintsVisible={areHintsVisible} />

      <h3 className="title">Wiki Speed Typing</h3>
      <div className="main-square">
        <UpperUI
          // resultsObj={resultsObj}
          toggleHints={toggleHints}
          areResultsVisible={areResultsVisible}
          areHintsVisible={areHintsVisible}
          timerValue={timerValue}
          isActive={isActive}
          // liveResults={props.state.liveResults}
          liveResults={liveResults}
        />

        <WikiDisplay
          indexOfPartialTextArr={indexOfPartialTextArr}
          arrToRender={arrToRender}
          arrOfPartialText={arrOfPartialText}
          ellipsis={ellipsis}
        />

        <InputArea
          changeTextAreaValue={changeTextAreaValue}
          toggleTimer={toggleTimer}
          focusTextArea={focusTextArea}
          isActive={isActive}
          areHintsVisible={areHintsVisible}
          toggleHints={toggleHints}
          textAreaValue={textAreaValue}
        />

        <Controls
          toggleTimer={toggleTimer}
          isActive={isActive}
          setTimerOnSelect={setTimerOnSelect}
          isDisabled={isDisabled}
          resetTimer={resetTimer}
          putFocusOnTextArea={putFocusOnTextArea}
        />

        <WikiController
          wikiTitle={wikiTitle}
          setNewRandomArticle={setNewRandomArticle}
          disablingButton={disablingButton}
          isActive={isActive}
          resetTimer={resetTimer}
          isCounterRunning={isCounterRunning}
        />

        <ResultsButton
          toggleResults={toggleResults}
          areResultsVisible={areResultsVisible}
          focusElement={focusElement}
        />
      </div>

      <Results
        areResultsVisible={areResultsVisible}
        // resultsObj={resultsObj} delete?
        // resultsAfterFinish={resultsAfterFinish} delete?
        finalResults={finalResults}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    timerValue: state.counter.timerValue, // (1)
    textAreaValue: state.InputArea,
    prevTextAreaValue: state.prevTextAreaValue,
    indexOfPartialTextArr: state.wikiDisplay.indexOfPartialTextArr,
    colorForEachLetter: state.wikiDisplay.colorForEachLetter,

    liveResults: state.liveResults,
    finalResults: state.finalResults

    
  };
};


const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    resultsCorrect: () => dispatch({ type: "RESULTS_CORRECT" }),
    resultsIncorrect: () => dispatch({ type: "RESULTS_INCORRECT" }),
    resultsNoPenalty: () => dispatch({ type: "RESULTS_NO_PENALTY" }),

      // for display only, delete later
      setIndexOfPartialTextArr: (data) => dispatch({type: "INDEX_OF_PARTIAL_TEXTARR" ,payload: data}),
      setTextAreaValue: (data) => dispatch({type: "TEXT_AREA_VALUE" ,payload: data}),
      setPrevTextAreaValue: (data) => dispatch({type: "TEXT_AREA_VALUE" ,payload: data}),
      setColorForEachLetter: (data) => dispatch({type: "COLOR_FOR_EACH_LETTER", payload: data})



   
  };
};

// export default Display;




export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Display); // (3)