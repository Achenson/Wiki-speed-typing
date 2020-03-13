import React from "react";
import { useState, useEffect, useCallback } from "react";
// import SingleLetter from "./SingleLetter.js";
import WikiController from "./WikiController.js";
import Hints from "./Hints.js";
import UpperUI from "./UpperUI.js";
import WikiDisplay from "./WikiDisplay.js";
import InputArea from "./InputArea.js";
import Controls from "./Controls.js";
import ResultsButton from "./ResultsButton.js";
import Results from "./Results.js";

// const escapeStringRegexp = require("escape-string-regexp");

function Display(props) {
  // rendering text ============================
  let lengthOfSinglePart = 363;

  let myTextToArr = props.myText.split("");
  let textDividedByLength_floor = Math.floor(
    myTextToArr.length / lengthOfSinglePart
  );

  let arrOfPartialText = makeArrOfPartialText(lengthOfSinglePart, myTextToArr);
  const [indexOfPartialTextArr, setIndexOfPartialTextArr] = useState(0);
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

  const [colorForEachLetter, setColorForEachLetter] = useState(
    // setting gray color for each letter by default
    makeDefaultColoredLetters()
  );

  const [textAreaValue, setTextAreaValue] = useState("");
  const [prevTextAreaValue, setPrevTextAreaValue] = useState("");

  //coloring letters in display according to errors or no
  //  + counting entries!!
  let { dispatch } = props;

  useEffect(() => {

    let arrOutOfTextValue = textAreaValue.split("");
    // console.log("arrOutOfTextValue");
    // console.log(arrOutOfTextValue);

    // for correct, incorrect, allEntries
    if (textAreaValue.length > prevTextAreaValue.length) {
      let colorForEachLetter_2 = [...colorForEachLetter];

      dispatch({ type: "resultsNoPenalty" });

      if (
        textAreaValue[textAreaValue.length - 1] ===
        arrOutOfText[textAreaValue.length - 1]
      ) {
        dispatch({ type: "resultsCorrect" });
        colorForEachLetter_2[textAreaValue.length - 1] = "blue";
      }

      if (
        textAreaValue[textAreaValue.length - 1] !==
        arrOutOfText[textAreaValue.length - 1]
      ) {
        dispatch({ type: "resultsIncorrect" });
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
    dispatch,
    colorForEachLetter,
    arrOutOfText,
    indexOfPartialTextArr,
    textDividedByLength_floor,
    textToRender.length,
    makeDefaultColoredLetters
  ]);

  // reseting display
  let { displayToReset, setDisplayToReset } = props;
  useEffect(() => {
    if (displayToReset) {
      resetDisplay();
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
      <Hints areHintsVisible={props.areHintsVisible} />

      <h3 className="title">Wiki Speed Typing</h3>
      <div className="main-square">
        <UpperUI
          resultsObj={props.resultsObj}
          toggleHints={props.toggleHints}
          areResultsVisible={props.areResultsVisible}
          areHintsVisible={props.areHintsVisible}
          timerValue={props.timerValue}
          isActive={props.isActive}
          liveResults={props.state.liveResults}
        />

        <WikiDisplay
          indexOfPartialTextArr={indexOfPartialTextArr}
          arrToRender={arrToRender}
          arrOfPartialText={arrOfPartialText}
          ellipsis={ellipsis}
        />

        <InputArea
          changeTextAreaValue={changeTextAreaValue}
          toggleTimer={props.toggleTimer}
          focusTextArea={props.focusTextArea}
          isActive={props.isActive}
          areHintsVisible={props.areHintsVisible}
          toggleHints={props.toggleHints}
          textAreaValue={textAreaValue}
        />

        <Controls
          toggleTimer={props.toggleTimer}
          isActive={props.isActive}
          setTimerOnSelect={props.setTimerOnSelect}
          isDisabled={props.isDisabled}
          resetTimer={props.resetTimer}
          putFocusOnTextArea={props.putFocusOnTextArea}
        />

        <WikiController
          wikiTitle={props.wikiTitle}
          setNewRandomArticle={props.setNewRandomArticle}
          disablingButton={props.disablingButton}
          isActive={props.isActive}
          resetTimer={props.resetTimer}
          isCounterRunning={props.isCounterRunning}
        />

        <ResultsButton
          toggleResults={props.toggleResults}
          areResultsVisible={props.areResultsVisible}
          focusElement={props.focusElement}
        />
      </div>

      <Results
        areResultsVisible={props.areResultsVisible}
        resultsObj={props.resultsObj}
        resultsAfterFinish={props.resultsAfterFinish}
        finalResults={props.state.finalResults}
      />
    </div>
  );
}

export default Display;
