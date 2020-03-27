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
      <div className="results-main top-score-main">
        <p>Top score</p>

      </div>


        <ul className="top-score-list container">
          <li>-</li>
          <li>-</li>
          <li>
            -
          </li>
          <li>
            -
          </li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
          <li>-</li>
        </ul>
      </div>
    </div>
  );
}

export default Stats;
