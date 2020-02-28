import React from "react";
//import { useState, useEffect, useRef } from "react";

function Results(props) {
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
            (timer length: {props.resultsDisplay})
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
  );
}

export default Results;
