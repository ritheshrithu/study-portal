import axios from "axios";
import { GET_ERRORS, GET_TOPICS } from "./types";

export const getTopics = () => dispatch => {
  axios
    .get("/api/portal/showtopics")
    .then(res => {
      //dispatch(setTopics(res.data));
      dispatch({
        type: GET_TOPICS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
/*export const setTopics = decoded => {
  return {
    type: SET_TOPICS,
    payload: decoded
  };
};*/
export const initializeTopics = () => dispatch => {
  return {
    type: "",
    payload: ""
  };
};
