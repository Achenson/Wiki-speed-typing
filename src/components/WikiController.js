import React from "react";
// import { useState, useEffect, useRef } from "react";

function WikiController(props) {
  console.log(props.wikiTitle);

  return (
    <div className="wiki-controler container">
      <div className="wiki-title-container">
        <p className="wiki-title-label">Current wikipedia article</p>
        <div className="wiki-title-display">
          <a
            className="wiki-title-display-link"
            href={`https://en.wikipedia.org/wiki/${props.wikiTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.wikiTitle}
          </a>
        </div>
      </div>
      <button
        className="btn btn-control btn-wiki"
        onClick={() => {
          if (props.timerValue === props.constantTimerValue) {
            props.setNewRandomArticle(true);
            props.disablingButton.current.setAttribute("disabled", true);
          } else {
            props.resetTimer();
            props.setNewRandomArticle(true);
             props.disablingButton.current.setAttribute("disabled", true);
          }
        }}
        ref={props.disablingButton}
      >
        Random Wiki Article
      </button>
    </div>
  );
}


export default WikiController;
