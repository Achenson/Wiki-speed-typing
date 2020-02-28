import React from "react";
//import { useState, useEffect, useRef } from "react";

function UpperUI(props) {
  
  return (
    <div className="upper-ui container">
    <div className="upper-ui-left">
      <div className="upper-ui-inner">
        <p
          className="upper-ui-item-label"
          style={{ visibility: "hidden" }}
        >
          Time
        </p>

        <p className="upper-ui-item counter">{props.counterDisplay}</p>
      </div>
    </div>
    <div className="upper-ui-right">
      <div className="upper-ui-inner">
        <p className="upper-ui-item-label">Speed (KPM)</p>

        <p className="upper-ui-item display-speed">
          {props.resultsObj.speed}
        </p>
      </div>
      <div className="upper-ui-inner">
        <p className="upper-ui-item-label">Accuracy</p>
        <p className="upper-ui-item display-accuracy">
          {props.resultsObj.accuracy} %
        </p>
      </div>

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
  </div>

  );
}

export default UpperUI;