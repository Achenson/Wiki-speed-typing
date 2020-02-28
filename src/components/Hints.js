import React from "react";
//import { useState, useEffect, useRef } from "react";

function Hints(props) {
  return (
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
            Press <b>Tab</b> once to pause, <b>Enter</b> to resume
          </li>
          <li>
            Press <b>Shift+Delete</b> to reset
          </li>
          <li>Click on the article title to visit wikipedia page</li>
          <li>Mouse over results for more information</li>
        </ul>
      </div>
    </div>
  );
}

export default Hints;
