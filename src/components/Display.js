import React from "react";
import { useState, useEffect, useRef } from "react";
// import SingleLetter from "./SingleLetter.js";
import WikiController from "./WikiController.js";
import Hints from "./Hints.js";
import UpperUI from "./UpperUI.js";
import WikiDisplay from "./WikiDisplay.js";
import InputArea from "./InputArea.js";
import Controls from "./Controls.js";

// const escapeStringRegexp = require("escape-string-regexp");

function Display(props) {
  let loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ENIM ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna ALIQua.`;

  const [myText, setMyText] = useState(loremText);
  const [wikiTitle, setWikiTitle] = useState("");
  // newRandomArticle will be fetched if true
  const [newRandomArticle, setNewRandomArticle] = useState(true);

  // Multiple extracts can only be returned if exintro is set to true.! (if only first part of wiki article is considered)
  let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;

  /*  ==== escaping string characters for Regex with escape-string-regexp npm module
    let regexpString = "'\\^!\"#$%&()*+,-./:;<=>?@[]^_`{|}~";

  const escapedString = escapeStringRegexp(regexpString);
  let testRegex = new RegExp(escapedString);
  console.log("TCL: Display -> testRegex", testRegex);

  let regexpStringEscaped = /'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~/;
  */

  // fetching data from wiki API ===============

  // disabling random wiki article button
  const disablingButton = useRef(null);

  useEffect(() => {
    fetchWikiApi();

    setNewRandomArticle(false);

    setTimeout(() => {
      disablingButton.current.removeAttribute("disabled");
    }, 500);

    function fetchWikiApi() {
      //////////////////////
      if (newRandomArticle) {
        fetch(wikiApiUrl, {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            let dataQueryPages = data.query.pages;

            // console.log(JSON.stringify(data, null, 2));
            /* 
          console.log(
            JSON.stringify(
              dataQueryPages[Object.keys(dataQueryPages)[0]],  // dataQueryPages[Object.keys(dataQueryPages)[0]].extract,
              null,
              2
            )
          );
*/
            let articleNoFormat =
              dataQueryPages[Object.keys(dataQueryPages)[0]].extract;

            //deleting all brackets and its content from article
            let articleExtract = articleNoFormat
              .replace(/\(.*\)/g, "")
              .replace(/\[.*\]/g, "")
              .replace(/\s\./g, ".")
              .replace(/\s,/g, ",")
              .replace(/\s\s/g, " ");

            if (articleExtract.length < 370) {
              console.log("text to short, rendering again");
              setWikiTitle("[Data loading...]");
              return fetchWikiApi();
            }

            // regex to exclude non-english characters
            let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;
            // let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;

            if (!regexpForEngCharOnly.test(articleExtract)) {
              console.log("characters out of english, rendering again");
              setWikiTitle("[Data loading...]");
              return fetchWikiApi();
            }

            setTextToRender(articleExtract);
            setWikiTitle(dataQueryPages[Object.keys(dataQueryPages)[0]].title);
          })
          .catch(() => {
            console.log("error fetching data");
            setMyText(loremText);
            setWikiTitle("[Error accessing wikipedia - default text loaded]");
          });
      }
      //////////////////////
    }
  }, [newRandomArticle, loremText, wikiApiUrl]);

  function setTextToRender(text) {
    setMyText(text);
  }

  // rendering text ============================
  let lengthOfSinglePart = 363;

  let myTextToArr = myText.split("");
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
          wikiTitle={wikiTitle}
          setNewRandomArticle={setNewRandomArticle}
          disablingButton={disablingButton}
          isActive={props.isActive}
          timerValue={props.timerValue}
          constantTimerValue={props.constantTimerValue}
          resetTimer={props.resetTimer}
        />
        <div className="results-buttons-row container">
          <button
            hidden
            className="btn btn-control btn-results"
            onClick={props.toggleResults}
            style={{
              backgroundColor: `${
                props.areResultsVisible ? "Black" : "steelblue"
              }`
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = `${
                props.areResultsVisible ? "steelblue" : "Black"
              }`;
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = `${
                props.areResultsVisible ? "Black" : "steelblue"
              }`;
            }}
            ref={props.focusElement}
          >
            Show<span style={{ margin: "auto 0.05em" }}>|</span>Hide Results
          </button>
        </div>
      </div>
      <div
        className="results"
        style={{
          visibility: `${props.areResultsVisible ? "visible" : "hidden"}`
        }}
      >
        <div className="inner-results container">
          <p className="results-title">
            Results{" "}
            <span style={{ fontWeight: "normal" }}>
              (timer length: {resultsDisplay})
            </span>
          </p>

          <div className="results-main">
            <div className="tooltip">
              <p>Speed: {props.resultsObj.speed} KPM</p>
              <span className="tooltip-text">
                Keys per minute - with penalties (minus 5 for 1 mistake/minute)
              </span>
            </div>

            <div className="tooltip">
              <p>Accuracy: {props.resultsObj.accuracy}%</p>
              <span className="tooltip-text">
                Incorrect entries/total entries percentage
              </span>
            </div>
          </div>

          <div className="results-other">
            <div className="tooltip">
              <p>Correct Entries: {props.resultsObj.correct}</p>
              <span className="tooltip-text">
                Total correct entries (including backspace corrected)
              </span>
            </div>

            <div className="tooltip">
              <p>Incorrect Entries: {props.resultsObj.incorrect}</p>
              <span className="tooltip-text">
                Total incorrect entries (including backspace corrected)
              </span>
            </div>
            <div className="tooltip">
              <p>Raw Key Speed: {props.resultsObj.noPenalty} KPM</p>
              <span className="tooltip-text">
                Keys per minute - without penalties for mistakes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
