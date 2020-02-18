import React from "react";
import { useState, useEffect, useRef } from "react";

function Wiki() {
  let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exlimit=1`;
  let wikiApiUrl_3 = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&prop=extracts&rvprop=content&grnlimit=1&rvslots=main&origin=*`;
  let wikiApiUrl_2 = `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&titles=Sweden&origin=*`;

  fetch(wikiApiUrl, {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data, null, 2)));

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

/* https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1&rvslots=main */

export default Wiki;
