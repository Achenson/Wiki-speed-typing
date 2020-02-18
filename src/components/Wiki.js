import React from "react";
import { useState, useEffect, useRef } from "react";

function Wiki(props) {
  const [wikiTitle, setWikiTitle] = useState("");
  const [newRandomArticle, setNewRandomArticle] = useState(true);

  let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=0&origin=*&explaintext`;
  // let wikiApiUrl_3 = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&prop=extracts&rvprop=content&grnlimit=1&rvslots=main&origin=*`;
  // let wikiApiUrl_2 = `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&titles=Sweden&origin=*`;




  useEffect(() => {


    if (newRandomArticle) {

      fetch(wikiApiUrl, {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          let dataQueryPages = data.query.pages;
  
          console.log(JSON.stringify(data, null, 2));
          console.log(
            JSON.stringify(
              dataQueryPages[Object.keys(dataQueryPages)[0]],
              null,
              2
            )
          );
          console.log(
            JSON.stringify(
              dataQueryPages[Object.keys(dataQueryPages)[0]].extract,
              null,
              2
            )
          );
  
          setWikiTitle(dataQueryPages[Object.keys(dataQueryPages)[0]].title);
  
          props.setTextToRender(
            dataQueryPages[Object.keys(dataQueryPages)[0]].extract
          );
        });

        setNewRandomArticle(false)
    }

  
  }, [newRandomArticle]);
  // JSON.stringify(data, null, 2

  return (
    <div className="wiki-controler container">
      <div className="wiki-title-container">
        <p className="wiki-title-label">Current wikipedia article</p>
        <div className="wiki-title-display">{wikiTitle}</div>
      </div>
      <button className="btn btn-control btn-wiki" onClick={() =>setNewRandomArticle(true)}>Random Wiki Article</button>
    </div>
  );
}

/* https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1&rvslots=main */

export default Wiki;
