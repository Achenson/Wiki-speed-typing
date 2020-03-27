import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
// import { farFaChartBar } from "@fortawesome/fontawesome-svg-core";

function LowerUI(props) {

  const faChartBar_default = "fa-chart-bar-default"
  const faChartBar_inverted = "fa-chart-bar-inverted"
  
  const [faChartBarClass, setFaChartBarClass] = useState(faChartBar_default)

  useEffect( () => {

    if(props.areStatsVisible) {
      setFaChartBarClass(faChartBar_inverted)
    } else {
      setFaChartBarClass(faChartBar_default)
    }


  }, [props.areStatsVisible])

  return (
    <div className="results-buttons-row container">
      <button
        hidden
        className="btn btn-control btn-results"
        onClick={props.toggleResults}
        style={{
          backgroundColor: `${props.areResultsVisible ? "Black" : "steelblue"}`
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = `${
            props.areResultsVisible ? "steelblue" : "Black"
          }`;
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = `${
            props.areResultsVisible ? "Black" : "steelblue"
          }`;
        }}
        ref={props.focusElement}
      >
        Show<span style={{ margin: "auto 0.05em" }}>|</span>Hide Results
      </button>

      <FontAwesomeIcon
        icon={faChartBar}
        size="2x"
        onClick={props.toggleStats}
        // MouseEnter/MouseLeave didn't work properly, css :hover instead
        className={faChartBarClass}
      />
    </div>
  );
}


export default LowerUI;
