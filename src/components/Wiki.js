import React from "react";
import { useState, useEffect, useRef } from "react";

function Wiki(props) {
  return (
    <div className="wiki-controler container">
      <div className="wiki-title-container">
        <p className="wiki-title-label">Current wikipedia article</p>
        <div className="wiki-title-display"
        
        >
        <a className="wiki-title-display-link" href={`https://en.wikipedia.org/wiki/${props.wikiTitle}`} target="_blank">
        {props.wikiTitle}
        </a>
        
        </div>
      </div>
      <button
        className="btn btn-control btn-wiki"
        onClick={() => props.setNewRandomArticle(true)}
      >
        Random Wiki Article
      </button>
    </div>
  );
}

/* https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1&rvslots=main */

export default Wiki;
