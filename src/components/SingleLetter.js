import React from "react";
//import { useState, useEffect, useRef } from "react";

function SingleLetter(props) {
  let textDecoration = "none";
  let fontWeight = "normal";
  // let backgroundColor = "white"

  if (props.color === "red") {
    textDecoration = "underline";
  }

  if (props.color === "blue" && props.letterToRender === " ") {
    textDecoration = "underline";
    // backgroundColor = "AliceBlue";
  }


  /*  if (props.color === "LimeGreen") {
    
    backgroundColor = "#454545"
    // backgroundColor = "#5C5C5C"
    // backgroundColor = "White"
  }

  if (props.color === "red") {
    backgroundColor = "#E3E3E3";
  }  */


  // if (props.color === "green") {
  //fontWeight = "bold";
  //}

  return (
    <span
      style={{
        color: `${props.color}`,
        textDecoration: `${textDecoration}`,
        fontWeight: `${fontWeight}`,
        // backgroundColor: `${backgroundColor}`
        // backgroundColor: `${backgroundColor}`
      }}
    >
      {props.letterToRender}
    </span>
  );
}

export default SingleLetter;
