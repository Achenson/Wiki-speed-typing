import React from "react";
//import { useState, useEffect, useRef } from "react";

function Results(props) {
  // counter display proper format in results
  let resultsDisplay;
  let resultsMinutes;
  let resultsSeconds;

  let minutesInt_constTimer = Math.floor(
    props.resultsAfterFinish["timer length"] / 60
  );
  let minutesStr_constTimer = minutesInt_constTimer.toString();
  let secondsInt_constTimer =
    props.resultsAfterFinish["timer length"] - minutesInt_constTimer * 60;
  let secondsStr_constTimer = secondsInt_constTimer.toString();

  minutesInt_constTimer
    ? (resultsMinutes = `${minutesStr_constTimer}min`)
    : (resultsMinutes = "");
  secondsInt_constTimer
    ? (resultsSeconds = `${secondsStr_constTimer}s`)
    : (resultsSeconds = "");

  resultsDisplay = `${resultsMinutes} ${resultsSeconds}`;

  return (
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
            <p>Speed: {props.resultsAfterFinish.speed} KPM</p>
            <span className="tooltip-text">
              Keys per minute - with penalties (minus 5 for 1 mistake/minute)
            </span>
          </div>

          <div className="tooltip">
            <p>Accuracy: {props.resultsAfterFinish.accuracy}%</p>
            <span className="tooltip-text">
              Incorrect entries/total entries percentage
            </span>
          </div>
        </div>

        <div className="results-other">
          <div className="tooltip">
            <p>Correct Entries: {props.resultsAfterFinish.correct}</p>
            <span className="tooltip-text">
              Total correct entries (including backspace corrected)
            </span>
          </div>

          <div className="tooltip">
            <p>Incorrect Entries: {props.resultsAfterFinish.incorrect}</p>
            <span className="tooltip-text">
              Total incorrect entries (including backspace corrected)
            </span>
          </div>
          <div className="tooltip">
            <p>Raw Key Speed: {props.resultsAfterFinish.noPenalty} KPM</p>
            <span className="tooltip-text">
              Keys per minute - without penalties for mistakes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
