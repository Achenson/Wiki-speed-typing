import React from "react";
//import { useState, useEffect, useRef } from "react";

function Stats(props) {
  return (
    <div
      className="stats"
      style={{
        visibility: `${props.areStatsVisible ? "visible" : "hidden"}`
      }}
    >
      <div className="inner-stats container">
        <p className="stats-title">Top score</p>
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

export default Stats;
