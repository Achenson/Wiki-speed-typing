// import React from "react";
import { useEffect } from "react";

function Fetch(props) {
  // fetching data from wiki API ===============

  // Multiple extracts can only be returned if exintro is set to true.! (if only first part of wiki article is considered)
  // let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;

  /*  ==== escaping string characters for Regex with escape-string-regexp npm module
  let regexpString = "'\\^!\"#$%&()*+,-./:;<=>?@[]^_`{|}~";
  
  const escapedString = escapeStringRegexp(regexpString);
  let testRegex = new RegExp(escapedString);
  console.log("TCL: Display -> testRegex", testRegex);
  
  let regexpStringEscaped = /'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~/;
  */

  /*  // disabling random wiki article button
 const disablingButton = useRef(null); */

  let { setMyText, setWikiTitle, setNewRandomArticle, disablingButton, newRandomArticle, loremText    } = props;
 
  useEffect(() => {
    let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;
    fetchWikiApi();

    //  props.setNewRandomArticle(false);
    setNewRandomArticle(false);

    setTimeout(() => {
      // props.disablingButton.current.removeAttribute("disabled");
      disablingButton.current.removeAttribute("disabled");
    }, 500);

    function fetchWikiApi() {
      if (newRandomArticle) {
        fetch(wikiApiUrl, {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            let dataQueryPages = data.query.pages;

            // console.log(JSON.stringify(data, null, 2));
            /* 
          console.log(
            JSON.stringify(
              dataQueryPages[Object.keys(dataQueryPages)[0]],  // dataQueryPages[Object.keys(dataQueryPages)[0]].extract,
              null,
              2
            )
          );
*/
            let articleNoFormat =
              dataQueryPages[Object.keys(dataQueryPages)[0]].extract;

            //deleting all brackets and its content from article
            let articleExtract = articleNoFormat
              .replace(/\(.*\)/g, "")
              .replace(/\[.*\]/g, "")
              .replace(/\s\./g, ".")
              .replace(/\s,/g, ",")
              .replace(/\s\s/g, " ");

            if (articleExtract.length < 370) {
              console.log("text to short, rendering again");
              setWikiTitle("[Data loading...]");
              return fetchWikiApi();
            }

            // regex to exclude non-english characters
            let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;
            // let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;

            if (!regexpForEngCharOnly.test(articleExtract)) {
              console.log("characters out of english, rendering again");
              setWikiTitle("[Data loading...]");
              return fetchWikiApi();
            }

            setTextToRender(articleExtract);
            setWikiTitle(dataQueryPages[Object.keys(dataQueryPages)[0]].title);
          })

          .catch(() => {
            console.log("error fetching data");
            setMyText(loremText);
            setWikiTitle("[Error accessing wikipedia - default text loaded]");
          });
      }
    }
    function setTextToRender(text) {
      setMyText(text);
    }
  }, [
    newRandomArticle,
    loremText,
    disablingButton,
    setMyText,
    setNewRandomArticle,
    setWikiTitle
  ]);

  return null;
}

export default Fetch;
