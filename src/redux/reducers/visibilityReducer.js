const initialState = {
  areHintsVisible: false,
  areResultsVisible: false,
  areStatsVisible: false
};

function visibilityReducer(state = initialState, action) {
  let { areHintsVisible, areResultsVisible, areStatsVisible } = state;

  switch (action.type) {
    case "HINTS_VISIBILITY":
      return {
        ...state,

        areHintsVisible: !areHintsVisible,
        areResultsVisible: areResultsVisible,
        areStatsVisible: areStatsVisible
      };
    case "RESULTS_VISIBILITY":
      return {
        ...state,

        areHintsVisible: areHintsVisible,
        areResultsVisible: !areResultsVisible,
        areStatsVisible: areStatsVisible
      };
    case "STATS_VISIBILITY":
      return {
        ...state,

        areHintsVisible: areHintsVisible,
        areResultsVisible: areResultsVisible,
        areStatsVisible: !areStatsVisible
      };

    default:
      return state;
  }
}

export default visibilityReducer;
