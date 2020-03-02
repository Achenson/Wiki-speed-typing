import React from "react";
import { useState, useEffect, useRef } from "react";
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
  let roundedTextDividedByLength = Math.round(
    myTextToArr.length / lengthOfSinglePart
  );

  let arrOfPartialText = makeArrOfPartialText(lengthOfSinglePart, myTextToArr);
  const [indexOfPartialTextArr, setIndexOfPartialTextArr] = useState(0);
  const textToRender = arrOfPartialText[indexOfPartialTextArr];
  let arrOutOfText = textToRender.split("");

  const [colorForEachLetter, setColorForEachLetter] = useState(
    // setting gray color for each letter by default
    makeColoredLetters()
  );

  const [textAreaValue, setTextAreaValue] = useState("");
  const [prevTextAreaValue, setPrevTextAreaValue] = useState("");

  let arrOutOfTextValue = textAreaValue.split("");

  //coloring letters in display according to errors or no
  //  + counting entries!!
  useEffect(() => {
    let arrOfColors = [...colorForEachLetter];

    for (let i = 0; i < textAreaValue.length; i++) {
      if (arrOutOfTextValue[i] !== arrOutOfText[i]) {
        arrOfColors[i] = "red";
      }

      if (arrOutOfTextValue[i] === arrOutOfText[i]) {
        arrOfColors[i] = "blue";
      }
    }

    for (let i = 0; i < arrOutOfText.length; i++) {
      if (arrOutOfTextValue[i] == null) {
        arrOfColors[i] = "DimGray";
      }
    }

    setColorForEachLetter(arrOfColors);
    // for correct, incorrect, allEntries
    if (textAreaValue.length > prevTextAreaValue.length) {
      props.setResultsNoPenalty(props.resultsNoPenalty + 1);

      if (arrOfColors[textAreaValue.length - 1] === "blue") {
        props.setResultsCorrect(props.resultsCorrect + 1);
      }

      if (arrOfColors[textAreaValue.length - 1] === "red") {
        props.setResultsIncorrect(props.resultsIncorrect + 1);
      }
    }
    setPrevTextAreaValue(textAreaValue);
  }, [textAreaValue]);

  // reseting display
  useEffect(() => {
    if (props.toReset) {
      resetDisplay();
    }

    function resetDisplay() {
      setTextAreaValue("");
      setIndexOfPartialTextArr(0);
      setColorForEachLetter(makeColoredLetters());
    }
  }, [props.toReset]);

  // arrToRender = [ [letter, color for the letter], ... ]
  const arrToRender = makeArrayToRender();

  function makeArrOfPartialText(lengthOfSinglePart, myTextToArr) {
    let arrOfPartialText = [];
    //let myTextToArr = text.split("");

    for (let i = 0; i <= roundedTextDividedByLength; i++) {
      let newArr = [];
      for (
        let j = 0 + i * (lengthOfSinglePart + 1);
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
  //make default(gray) color in wiki display area
  function makeColoredLetters() {
    let arrToReturn = [];
    for (let i = 0; i < arrOutOfText.length; i++) {
      arrToReturn.push("DimGray");
    }
    return arrToReturn;
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
    //console.log();

    if (e.target.value.length === textToRender.length) {
      e.target.value = "";
      setTextAreaValue("");

      if (indexOfPartialTextArr < roundedTextDividedByLength - 1) {
        setIndexOfPartialTextArr(
          indexOfPartialTextArr => indexOfPartialTextArr + 1
        );
      } else {
        setIndexOfPartialTextArr(0);
      }
    }

    setTextAreaValue(e.target.value);
  }

  // counter display ================================

  let minutesInt = Math.floor(props.timerValue / 60);
  //console.log("TCL: Display -> minutesInt", minutesInt);
  let secondsInt = props.timerValue - minutesInt * 60;
  //console.log("TCL: Display -> secondsInt", secondsInt);

  let minutesStr = minutesInt.toString();
  let secondsStr = secondsInt.toString();

  let minutesFormatted;
  let secondsFormatted;

  if (minutesInt >= 10) {
    minutesFormatted = minutesStr;
  } else {
    minutesFormatted = `0${minutesStr}`;
  }

  if (secondsInt >= 10) {
    secondsFormatted = secondsStr;
  } else {
    secondsFormatted = `0${secondsStr}`;
  }

  // counter display in results
  let counterDisplay = `${minutesFormatted}:${secondsFormatted}`;

  let resultsDisplay;
  let resultsMinutes;
  let resultsSeconds;

  minutesInt ? (resultsMinutes = `${minutesStr}min`) : (resultsMinutes = "");
  secondsInt ? (resultsSeconds = `${secondsStr}s`) : (resultsSeconds = "");

  resultsDisplay = `${resultsMinutes} ${resultsSeconds}`;

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
          counterDisplay={counterDisplay}
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
          timerValue={props.timerValue}
          constantTimerValue={props.constantTimerValue}
          resetTimer={props.resetTimer}
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
        resultsDisplay={resultsDisplay}
      />
    </div>
  );
}

export default Display;
