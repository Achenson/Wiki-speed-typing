const initialState = {
  isAuthenticated: true,
  isNotificationNeeded: false
};

function authReducer(state = initialState, action) {

  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,

        isAuthenticated: true
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false
      };
    case "NOTIFICATION_TRUE":
      return {
        ...state,
        isNotificationNeeded: true
      };
      case "NOTIFICATION_FALSE":
        return {
          ...state,
          isNotificationNeeded: false
        };




    default:
      return state;
  }
}

export default authReducer;
