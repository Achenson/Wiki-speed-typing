import React from "react";
import { useState, useEffect, useRef } from "react";

function Wiki() {
  return (
    <div className="wiki-controler container">
      <div className="wiki-title-container">
        <p className="wiki-title-label">Current wikipedia article</p>
        <div className="wiki-title-display"></div>
      </div>
      <button className="btn btn-control btn-wiki">Random Wiki Article</button>
    </div>
  );
}

export default Wiki;
