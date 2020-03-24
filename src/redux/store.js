import { createStore } from "redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

import rootReducer from "./reducers.js";

const initialState = {
 
};

// const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState
  //optinal!
  /*   compose(
    applyMiddleware(...middleware),
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) */
);
export default store;