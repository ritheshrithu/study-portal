import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const middleware = [thunk];
import rootReducer from "./reducers";
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  //composeEnhancers(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

export default store;
