import React from "react";
//import { useState, useEffect, useRef } from "react";


function Controls(props) {
  return (
    <div className="control-buttons-row container">
    <div className="column-left">
      <button
        className="btn btn-control control-item"
        onClick={() => props.toggleTimer()}
      >
        {props.isActive ? "Pause" : "Run"}
      </button>
      <select
        className="control-item"
        onChange={props.setTimerOnSelect}
        // ref={composeRefs(focusElement, props.isDisabled)}
        ref={props.isDisabled}
      >
        <option value="5">00:05</option>
        <option value="30">00:30</option>
        <option value="60" selected="selected">
          01:00
        </option>
        <option value="120">02:00</option>
        <option value="300">05:00</option>
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
  );
}

export default Controls;