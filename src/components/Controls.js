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
          className="control-item timer-select"
          onChange={props.setTimerOnSelect}
          ref={props.isDisabled}
          defaultValue="60"
        >
          <option value="5">00:05</option>
          <option value="30">00:30</option>
          <option value="60">01:00</option>
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
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;
