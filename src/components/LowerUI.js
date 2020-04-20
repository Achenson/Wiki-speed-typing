import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
// import { farFaChartBar } from "@fortawesome/fontawesome-svg-core";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

function LowerUI({
  areStatsVisible,
  areResultsVisible,
  toggleAreResultsVisible,
  focusElement,
  toggleStats,
  isAuthenticated,
  notification_true,
  toggleActive,
  isActive,
}) {
  let history = useHistory();

  const faChartBar_default = "fa-chart-bar-default";
  const faChartBar_inverted = "fa-chart-bar-inverted";

  const [faChartBarClass, setFaChartBarClass] = useState(faChartBar_default);

  useEffect(() => {
    if (areStatsVisible) {
      setFaChartBarClass(faChartBar_inverted);
    } else {
      setFaChartBarClass(faChartBar_default);
    }
  }, [areStatsVisible]);

  return (
    <div className="results-buttons-row container">
      <button
        hidden
        className="btn btn-control btn-results"
        onClick={() => {
          if (isActive) {
            toggleActive();
            toggleAreResultsVisible();
          } else {
            toggleAreResultsVisible();
          }
        }}
        style={{
          backgroundColor: `${areResultsVisible ? "Black" : "steelblue"}`,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = `${
            areResultsVisible ? "steelblue" : "Black"
          }`;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = `${
            areResultsVisible ? "Black" : "steelblue"
          }`;
        }}
        ref={focusElement}
      >
        Show<span style={{ margin: "auto 0.05em" }}>|</span>Hide Results
      </button>

      <FontAwesomeIcon
        icon={faChartBar}
        size="2x"
        onClick={() => {
          if (isAuthenticated) {
            toggleStats();
          } else {
            if (isActive) {
              toggleActive();
            }
            notification_true();
            history.push("/login");
          }
        }}
        // MouseEnter/MouseLeave didn't work properly, css :hover instead
        className={faChartBarClass}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    // notificationToggle: () => dispatch({type: "NOTIFICATION_TOGGLE"})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notification_true: () => dispatch({ type: "NOTIFICATION_TRUE" }),
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    toggleAreResultsVisible: () => dispatch({ type: "RESULTS_VISIBILITY" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(LowerUI);
