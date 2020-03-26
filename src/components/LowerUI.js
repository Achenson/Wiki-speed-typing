import React from "react";
//import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
// import { farFaChartBar } from "@fortawesome/fontawesome-svg-core";

function LowerUI(props) {
  return (
    <div className="results-buttons-row container">
      <button
        hidden
        className="btn btn-control btn-results"
        onClick={props.toggleResults}
        style={{
          backgroundColor: `${props.areResultsVisible ? "Black" : "steelblue"}`
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

      <FontAwesomeIcon
        icon={faChartBar}
        size="2x"
        className="fa-chart-bar"
        onClick={props.toggleStats}
        style={{
          color: `${props.areStatsVisible ? "black" : "green"}`
        }}
        onMouseEnter={e => {
          e.target.style.color = `${props.areStatsVisible ? "green" : "black"}`;
        }}
        onMouseLeave={e => {
          e.target.style.color = `${props.areStatsVisible ? "black" : "green"}`;
        }}
      />
    </div>
  );
}

export default LowerUI;
