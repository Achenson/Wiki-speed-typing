/* 

possible issues: 
1.can't pause during first second (ignore it?)
2. result are being hidden after 1 second if the timer is on
(make the btn unresponsive if the timer is on)
DONE 3. Disable time select if the app is running!!! DONE

toChange:
1. counter display (00:00 format)
2. Start is also a pause btn (change it to arrow and ||)
3. Set default select value to higher val
4. Results display to fast - add some animation??
5. show|hide results -> make the button name togglable show & hide?
6. uninstall compose refs?
7. contrast between main square and correct letters
8. display hint& result on one of the displays?
9. add tooltips!!!
10. resultObj and set individual results redundant!!???
*/

import React from "react";
import { useState, useEffect, useRef } from "react";
import composeRefs from "@seznam/compose-react-refs";

import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(5);
  const [constantTimerValue, setConstantTimerValue] = useState(5);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);

  // for Results

  const [resultsSpeed, setResultsSpeed] = useState(0);
  const [resultsAccuracy, setResultsAccuracy] = useState(0);
  const [resultsCorrect, setResultsCorrect] = useState(0);
  const [resultsIncorrect, setResultsIncorrect] = useState(0);
  const [resultsNoPenalty, setResultsNoPenalty] = useState(0);

  // delete ?!!!
  const [resultsObj, setResultsObj] = useState({
    speed: 0,
    accuracy: 0,
    correct: 0,
    incorrect: 0,
    noPenalty: 0,
    "timer length": 7,
    date: 8
  });

  function resultsMaker(speed, accuracy, correct, incorrect, noPenalty) {
    return {
      speed: speed,
      accuracy: accuracy,
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenalty,
      "timer length": constantTimerValue.toString(),
      date: Date.now().toString()
    };
  }

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  // for counter
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );

      if (areResultsVisible) {
        toggleResults();
      }
    }

    if (toReset) {
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      toggleActive(false);
      setToReset(false);
    }

    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
    }

    if (timerValue <= 0) {

      setResultsSpeed(0)
      setResultsAccuracy(0)
      setResultsCorrect(0)
      setResultsIncorrect(0)
      setResultsNoPenalty(0)


      toggleActive(false);
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setToReset(true);

      if (!areResultsVisible) {
        toggleResults();
      }

      setResultsObj(
        resultsMaker(
          resultsSpeed,
          resultsAccuracy,
          resultsCorrect,
          resultsIncorrect,
          resultsNoPenalty
        )
      );

      //setToReset(false);
    }

    // this equivalent to componentWillUnmount
    return () => clearInterval(timerInterval);
    // useEffect will run every time isActive changes
  }, [isActive, timerValue, toReset]);

  // for pause button
  function toggleTimer() {
    toggleActive(!isActive);
  }

  // for time select
  function setTimerOnSelect(e) {
    setTimerValue(e.target.value);
    setConstantTimerValue(e.target.value);
  }

  function resetTimer() {
    if (timerValue !== constantTimerValue) {
      setToReset(true);
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
      if (event.key == "Tab" && isActive) {
        toggleTimer();
        delete keysPressed[event.key];
      }

      if (keysPressed["Shift"] && event.key == "Delete") {
        resetTimer();

        delete keysPressed[event.key];
      }
    }

    //toggleTimer();

    return;
  }

  // hints & results visibility
  const [areHintsVisible, setAreHintsVisible] = useState(false);

  function toggleHints() {
    setAreHintsVisible(!areHintsVisible);
  }

  const [areResultsVisible, setAreResultsVisible] = useState(false);

  function toggleResults() {
    setAreResultsVisible(!areResultsVisible);
  }

  // for disabling select

  const isDisabled = useRef(null);

  useEffect(() => {
    if (isActive) {
      isDisabled.current.setAttribute("disabled", true);
    } else {
      isDisabled.current.removeAttribute("disabled");
    }
  }, [isActive]);

  // useRef unfocusing textArea

  const focusElement = useRef(null);
  const focusTextArea = useRef(null);

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

  return (
    <div className="App" onKeyDown={handleKeyPress}>
      <Display
        timerValue={timerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        areHintsVisible={areHintsVisible}
        areResultsVisible={areResultsVisible}
        toggleHints={toggleHints}
        toggleResults={toggleResults}
        c
        isDisabled={isDisabled}
        focusTextArea={focusTextArea}
        focusElement={focusElement}
        putFocusOnTextArea={putFocusOnTextArea}
        setResultsObj={setResultsObj}
        resultsObj={resultsObj}
        resultsMaker={resultsMaker}
        setResultsSpeed={setResultsSpeed}
        setResultsAccuracy={setResultsAccuracy}
        setResultsCorrect={setResultsCorrect}
        setResultsIncorrect={setResultsIncorrect}
        setResultsNoPenalty={setResultsNoPenalty}
        resultsNoPenalty={resultsNoPenalty}
      />
    </div>
  );
}

function SingleLetter(props) {
  let textDecoration = "none";
  let fontWeight = "normal";

  if (props.color === "red") {
    textDecoration = "underline";
  }

  // if (props.color === "green") {
  //fontWeight = "bold";
  //}

  return (
    <span
      style={{
        color: `${props.color}`,
        textDecoration: `${textDecoration}`,
        fontWeight: `${fontWeight}`
      }}
    >
      {props.letterToRender}
    </span>
  );
}

function Display(props) {
  let myText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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

  let lengthOfSinglePart = 362;
  let myTextToArr = myText.split("");
  let roundedTextDividedByLength = Math.round(
    myTextToArr.length / lengthOfSinglePart
  );

  let arrOfPartialText = makeArrOfPartialText(lengthOfSinglePart, myTextToArr);

  //362 text length fits
  //console.log(myText.length);

  const [indexOfPartialTextArr, setIndexOfPartialTextArr] = useState(0);

  //const [textToRender, setTextToRender] = useState(arrOfPartialText[0]);
  const textToRender = arrOfPartialText[indexOfPartialTextArr];

  let arrOutOfText = textToRender.split("");

  const [colorForEachLetter, setColorForEachLetter] = useState(
    makeColoredLetters()
  );

  const [textAreaValue, setTextAreaValue] = useState("");
  const [prevTextAreaValue, setPrevTextAreaValue] = useState("");

  let arrOutOfTextValue = textAreaValue.split("");

  //coloring letters in display according to errors or no
  //  + counting entries!!

  useEffect(() => {
    // for counting
    if (textAreaValue.length > prevTextAreaValue.length) {
      props.setResultsNoPenalty(props.resultsNoPenalty + 1 );
    }

    let arrOfColors = [...colorForEachLetter];

    let copyOfArrOfColors = [...arrOfColors];

    console.log(arrOfColors.length);
    console.log(copyOfArrOfColors.length);

    for (let i = 0; i < textAreaValue.length; i++) {
      if (arrOutOfTextValue[i] !== arrOutOfText[i]) {
        arrOfColors[i] = "red";
      }

      if (arrOutOfTextValue[i] === arrOutOfText[i]) {
        arrOfColors[i] = "LimeGreen";
      }
    }

    for (let i = 0; i < arrOutOfText.length; i++) {
      if (arrOutOfTextValue[i] == null) {
        arrOfColors[i] = "black";
      }
    }

    setColorForEachLetter(arrOfColors);
    // for counting
    setPrevTextAreaValue(textAreaValue);
  }, [textAreaValue]);

  // reseting display

  useEffect(() => {
    if (props.toReset) {
      resetDisplay();
    }
  }, [props.toReset]);

  // displaying next part of text to display
  const arrToRender = makeArrayToRender();

  function makeArrOfPartialText(lengthOfSinglePart, myTextToArr) {
    let arrOfPartialText = [];
    //let myTextToArr = text.split("");

    for (let i = 0; i < roundedTextDividedByLength; i++) {
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

  function makeColoredLetters() {
    let arrToReturn = [];
    for (let i = 0; i < arrOutOfText.length; i++) {
      arrToReturn.push("black");
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

  function resetDisplay() {
    setTextAreaValue("");
    setIndexOfPartialTextArr(0);
    setColorForEachLetter(makeColoredLetters());
  }

  return (
    <div className="outer-container">
      <div
        className="hints"
        style={{
          visibility: `${props.areHintsVisible ? "visible" : "hidden"}`
        }}
      >
        <div className="inner-hints container">
          <p className="hints-title">Hints</p>
          <ul>
            <li>Change the timer value (optional)</li>
            <li>Type in typing area to start/resume</li>
            <li>
              Press <b>Tab</b> to pause
            </li>
            <li>
              Press <b>Shift+Delete</b> to reset
            </li>
            <li>Mouse over result labels for more information</li>
          </ul>
        </div>
      </div>
      <h3 className="title">Typing App</h3>
      <div className="main-square">
        <div className="upper-ui container">
          <p className="counter ">{props.timerValue}</p>
          <button
            className="btn btn-display-hints"
            onClick={props.toggleHints}
            style={{
              backgroundColor: `${props.areHintsVisible ? "black" : "green"}`
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = `${
                props.areHintsVisible ? "green" : "black"
              }`;
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = `${
                props.areHintsVisible ? "black" : "green"
              }`;
            }}
          >
            ?
          </button>
        </div>
        <div className="wiki-display container">
          {arrToRender.map((el, i) => {
            return (
              <SingleLetter letterToRender={el[0]} color={el[1]} key={i} />
            );
          })}
        </div>

        <textarea
          className="typing-display container"
          onChange={e => {
            changeTextAreaValue(e);

            if (!props.isActive) {
              props.toggleTimer();
            }
          }}
          autoFocus
          // crucial for two-way binding! reset button
          value={textAreaValue}
          ref={props.focusTextArea}
          onPaste={e => {
            e.preventDefault();
          }}

          //onBlur={props.toggleTimer}
        ></textarea>

        <div className="control-buttons-row container">
          <div className="column-left">
            <button
              className="btn btn-control control-item"
              onClick={() => props.toggleTimer()}
            >
              {props.isActive ? "Pause" : "Start"}
            </button>
            <select
              className="control-item"
              onChange={props.setTimerOnSelect}
              // ref={composeRefs(focusElement, props.isDisabled)}
              ref={props.isDisabled}
            >
              <option value="5">00:05</option>
              <option value="30">00:30</option>
              <option value="60">01:00</option>
            </select>
          </div>

          <div className="column-right">
            <button
              className="btn btn-control control-item btn-reset"
              onClick={event => {
                props.resetTimer();
                props.putFocusOnTextArea();

                //resetDisplay();
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="results-buttons-row container">
          <button
            className="btn btn-control btn-results"
            onClick={props.toggleResults}
            style={{
              backgroundColor: `${
                props.areResultsVisible ? "black" : "steelblue"
              }`
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = `${
                props.areResultsVisible ? "steelblue" : "black"
              }`;
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = `${
                props.areResultsVisible ? "black" : "steelblue"
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
          <p className="results-title">Results</p>
          <ul>
            <li>Keys Per Minute: {props.resultsObj.speed}</li>
            <li>Accuracy: {props.resultsObj.accuracy}</li>

            <li>Correct Entries: {props.resultsObj.correct}</li>
            <li>Incorrect Entries: {props.resultsObj.incorrect}</li>
            <li>KPM no penalties: {props.resultsObj.noPenalty}</li>

            <li>Timer length: {props.resultsObj["timer length"]}</li>
            <li>Date: {props.resultsObj.date}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
