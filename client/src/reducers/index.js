import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import topicReducer from "./topicReducer";
import techReducer from "./techReducer";
import techDataReducer from "./techDataReducer";
export default combineReducers({
  auth: authReducer,
  topics: topicReducer,
  techs: techReducer,
  techData: techDataReducer,
  errors: errorReducer
});
