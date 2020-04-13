const initialState = {
  isAuthenticated: true,
  isNotificationNeeded: false,
  isErrorNotificationNeeded: true
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
        case "ERROR_TRUE":
          return {
            ...state,
            isErrorNotificationNeeded: false
          };
          case "ERROR_FALSE":
            return {
              ...state,
              isErrorNotificationNeeded: false
            };



    default:
      return state;
  }
}

export default authReducer;
