const initialState = {
  areHintsVisible: false,
  areResultsVisible: false,
  areStatsVisible: false,
  isConfirmDeleteVisible: false,
};

function visibilityReducer(state = initialState, action) {
  let {
    areHintsVisible,
    areResultsVisible,
    areStatsVisible,
    isConfirmDeleteVisible,
  } = state;

  switch (action.type) {
    case "HINTS_VISIBILITY":
      return {
        ...state,
        areHintsVisible: !areHintsVisible,
      };
    case "RESULTS_VISIBILITY":
      return {
        ...state,
        areResultsVisible: !areResultsVisible,
      };
    case "STATS_VISIBILITY":
      return {
        ...state,
        areStatsVisible: !areStatsVisible,
      };

    case "CONFIRM_DELETE_VISIBILITY":
      return {
        ...state,
        isConfirmDeleteVisible: !isConfirmDeleteVisible,
      };

    default:
      return state;
  }
}

export default visibilityReducer;
