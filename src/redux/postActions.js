import store from "./store.js"



export function fetchWikiApi(dispatch) {

  let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;



  if (store.getState().displayState.textDisplay.newRandomArticle) {
    fetch(wikiApiUrl, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        let dataQueryPages = data.query.pages;

        console.log(JSON.stringify(data, null, 2));
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
          .replace(/\s+/g, " ");

        if (articleExtract.length < 370) {
          console.log("text to short, rendering again");
          // setWikiTitle("[Data loading...]");
          dispatch({ type: "WIKI_TITLE", payload: data })
          return fetchWikiApi();
        }
        
        // regex to exclude non-english characters
        let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;
        // let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;
        
        if (!regexpForEngCharOnly.test(articleExtract)) {
          console.log("characters out of english, rendering again");
          // setWikiTitle("[Data loading...]");
          dispatch({ type: "WIKI_TITLE", payload: data })
          return fetchWikiApi();
        }
        
        // setTextToRender(articleExtract);
        dispatch({ type: "MY_TEXT", payload: articleExtract })

        
        // setWikiTitle(dataQueryPages[Object.keys(dataQueryPages)[0]].title);
        dispatch({ type: "WIKI_TITLE", payload: data })
        focusTextArea.current.removeAttribute("disabled");
      })

      .catch(() => {
        console.log("error fetching data");
        // setMyText(loremText);
        dispatch({ type: "MY_TEXT", payload: loremText })
        dispatch({ type: "WIKI_TITLE", payload: "[Error accessing wikipedia - default text loaded]" })
        // setWikiTitle("[Error accessing wikipedia - default text loaded]");
        focusTextArea.current.removeAttribute("disabled");
      });
  }





}