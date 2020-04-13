const initialState = {
  isAuthenticated: true,
  isNotificationNeeded: false,
  showLoginError: true
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
        case "LOGIN_ERROR_TRUE":
          return {
            ...state,
            showLoginError: true
          };
          case "LOGIN_ERROR_FALSE":
            return {
              ...state,
              showLoginError: false
            };



    default:
      return state;
  }
}

export default authReducer;
