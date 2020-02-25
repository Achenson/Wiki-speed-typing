/* 

possible issues: 
1.can't pause during first second (ignore it?)
2. result are being hidden after 1 second if the timer is on
(make the btn unresponsive if the timer is on)
DONE 3. Disable time select if the app is running!!! DONE
DONE 4. accuracy NaN! DONE
5. solve useEffect errors
DONE 6. current result not updading if user stop typing! DONE
DONE 7. CHECK how penalty should be applied! https://www.bleepingcomputer.com/forums/t/642883/calculating-net-typing-speed/ DONE
8. text to render undefined! error handling?
DONE 9. cutting one letter! DONE

toChange:
 DONE 1. counter display (00:00 format) DONE
X 2. Start is also a pause btn (change it to arrow and ||)X
3. Set default select value to higher val
X 4. Results display to fast - add some animation?? X
XX 5. show|hide results -> make the button name togglable show & hide?XX
DONE uninstall compose refs? DONE
DONE 7. contrast between main square and correct letters DONE
DONE 8. display hint& result on one of the displays? DONE
DONE 9. add tooltips!!! DONE
XX 10. resultObj and set individual results redundant!!??? XX
XX 11. hide result btn until 1 test was run? XX
12. disable 5s timer in the end
DONE 13. default results DONE
DONE 14. reset current display immediately after start DONE
DONE 15. placeholder text DONE
DONE 16. typing are get the scroll in the end -> different  font? DONE
DONE 17. timer value styling DONE
18. btn text not centered? FIrefox only?
19. scroll to results if they are not visible? Later - after wiki component is live
DONE 20. speed only 1 afer . DONE
21. transition for results?
22. implement phase transition?
DONE 23. wikipedia text length display? DONE
DONE 24. what if text is too short DONE
DONE 25. no "..." if case of last part of text DONE
DONE 26. getting rid of text in () [] DONE
DONE 27. getting rid of non-english chars DONE
28. proper components/state management
29. more Hints OR put Hints lower?
30. font for "speed typing app"
*/

import React from "react";
import { useState, useEffect, useRef } from "react";

import Display from "./components/Display.js";

import "./App.css";

function App() {
  const [timerValue, setTimerValue] = useState(5);
  const [constantTimerValue, setConstantTimerValue] = useState(5);

  // for start/pause button
  const [isActive, toggleActive] = useState(false);
  // for reset button
  const [toReset, setToReset] = useState(false);

  // for Results
  const [resultsCorrect, setResultsCorrect] = useState(0);
  const [resultsIncorrect, setResultsIncorrect] = useState(0);
  const [resultsNoPenalty, setResultsNoPenalty] = useState(0);

  const [resultsObj, setResultsObj] = useState({
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": constantTimerValue
  });

  function resultsMaker(correct, incorrect, allEntries) {
    // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live
    let noPenaltyKPM =
      Math.round(
        ((allEntries * 60) / (constantTimerValue - timerValue)) * 100
      ) / 100;
    let incorrectPerMinute =
      (incorrect * 60) / (constantTimerValue - timerValue);
    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

    return {
      speed: calcSpeed(),
      accuracy: calcAccuracy(),
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenaltyKPM,
      "timer length": constantTimerValue.toString()
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

  // for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  // for counter
  useEffect(() => {
    // otherwise there will be error: timerInterval not defined
    let timerInterval = null;
    let intervalForDisplay = null;

    // for displaying 0speed & 0 accuracy if the counter becomes active
    if (isActive && timerValue === constantTimerValue) {
      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
    }

    if (isActive && timerValue > 0) {
      timerInterval = setInterval(
        () => setTimerValue(timerValue => timerValue - 1),
        1000
      );
      // for displaying live results every 2 seconds
      if (isActive && timerValue % 2 === 0 && timerValue > 0) {
        setResultsObj(
          resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
        );
      }

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
    // turning counter off on pause
    if (!isActive && timerValue > 0) {
      clearInterval(timerInterval);
      clearInterval(intervalForDisplay);
    }

    if (timerValue <= 0) {
      // reseting results

      setResultsCorrect(0);
      setResultsIncorrect(0);
      setResultsNoPenalty(0);

      toggleActive(false);
      clearInterval(timerInterval);
      setTimerValue(constantTimerValue);
      setToReset(true);

      if (!areResultsVisible) {
        toggleResults();
      }

      setResultsObj(
        resultsMaker(resultsCorrect, resultsIncorrect, resultsNoPenalty)
      );
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
      if (event.key === "Tab" && isActive) {
        toggleTimer();
        delete keysPressed[event.key];
      }

      if (keysPressed["Shift"] && event.key === "Delete") {
        resetTimer();

        delete keysPressed[event.key];
      }
    }

    return;
  }

  // hints & results visibility
  const [areHintsVisible, setAreHintsVisible] = useState(false);
  const [areResultsVisible, setAreResultsVisible] = useState(false);

  function toggleHints() {
    if (!isActive) {
      setAreHintsVisible(!areHintsVisible);
    }
  }

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

  // useRef unfocusing btn-hints on textarea focus
  // useRef focusin on textArea is the timer is active

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
      // timer
        timerValue={timerValue}
        constantTimerValue={constantTimerValue}
        toggleTimer={toggleTimer}
        setTimerOnSelect={setTimerOnSelect}
        isActive={isActive}
        resetTimer={resetTimer}
        toReset={toReset}
        // hints & results visibility
        areHintsVisible={areHintsVisible}
        areResultsVisible={areResultsVisible}
        toggleHints={toggleHints}
        toggleResults={toggleResults}
        // disabling select, menaging focus
        isDisabled={isDisabled}
        focusTextArea={focusTextArea}
        putFocusOnTextArea={putFocusOnTextArea}
        focusElement={focusElement}
        // results
        resultsObj={resultsObj}
        resultsCorrect={resultsCorrect}
        setResultsCorrect={setResultsCorrect}
        resultsIncorrect={resultsIncorrect}
        setResultsIncorrect={setResultsIncorrect}
        resultsNoPenalty={resultsNoPenalty}
        setResultsNoPenalty={setResultsNoPenalty}
      />
    </div>
  );
}

export default App;
