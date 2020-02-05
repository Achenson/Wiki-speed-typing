import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(10);
  const [constantTimerValue, setConstantTimerValue] = useState(10);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);

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
      toggleActive(false);
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setToReset(true);

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

  function handleKeyPress(event) {
    // pause button will work only if the timer hasn't started yet
    if (event.key === "Pause" && constantTimerValue !== timerValue) {
      toggleTimer();
    }
    return;
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
      />
    </div>
  );
}

function SingleLetter(props) {
  let textDecoration = "none";

  if (props.color === "red") {
    textDecoration = "underline";
  }

  return (
    <span
      style={{ color: `${props.color}`, textDecoration: `${textDecoration}` }}
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
  let arrOutOfTextValue = textAreaValue.split("");

  //coloring letters in display according to errors or no
  useEffect(() => {
    let arrOfColors = [...colorForEachLetter];

    for (let i = 0; i < textAreaValue.length; i++) {
      if (arrOutOfTextValue[i] !== arrOutOfText[i]) {
        arrOfColors[i] = "red";
      }

      if (arrOutOfTextValue[i] === arrOutOfText[i]) {
        arrOfColors[i] = "green";
      }
    }

    for (let i = 0; i < arrOutOfText.length; i++) {
      if (arrOutOfTextValue[i] == null) {
        arrOfColors[i] = "black";
      }
    }

    setColorForEachLetter(arrOfColors);
  }, [textAreaValue]);

  // reseting display

  useEffect(() => {
    if (props.toReset) {
      resetDisplay();
    }
  }, [props.toReset]);

  // useRef unfocusing textArea

  const focusElement = useRef(null);
  const focusTextArea = useRef(null);

  useEffect(() => {
    if (props.timerValue <= 0) {
      focusElement.current.focus();
    }
  }, [props.timerValue]);

  useEffect(() => {
    if (props.isActive) {
      focusTextArea.current.focus();
    }
  }, [props.isActive]);

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

  // hints visibility
  const [areHintsVisible, setAreHintsVisible] = useState(true);

  function toggleHints() {
    setAreHintsVisible(!areHintsVisible);
  }

  return (
    <div className="outer-container">
      <div
        className="hints"
        style={{ visibility: `${areHintsVisible ? "hidden" : "visible"}` }}
      >
        <div className="inner-hints container">
          <p className="hints-title">Hints</p>
          <ul>
            <li>Set the timer</li>
            <li>Type to start/resume</li>
            <li>
              Keyboard shorcut for pause/resume: <b>Pause|Break</b>
            </li>
          </ul>
        </div>
      </div>
      <h3 className="title">Typing App</h3>
      <div className="main-square">
        <div className="upper-ui container">
          <p className="counter ">{props.timerValue}</p>
          <button
            className="btn btn-display-hints"
            onClick={toggleHints}
            style={{
              backgroundColor: `${areHintsVisible ? "green" : "black"}`
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = `${
                areHintsVisible ? "black" : "green"
              }`;
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = `${
                areHintsVisible ? "green" : "black"
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
          ref={focusTextArea}
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
              ref={focusElement}
            >
              <option value="10">00:10</option>
              <option value="30">00:30</option>
              <option value="60">01:00</option>
            </select>
          </div>

          <div className="column-right">
            <button
              className="btn btn-control control-item btn-reset"
              onClick={() => {
                props.resetTimer();

                //resetDisplay();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
