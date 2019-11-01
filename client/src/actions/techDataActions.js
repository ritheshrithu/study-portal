import axios from "axios";
import { GET_ERRORS, GET_TECHDATA } from "./types";

export const getTechData = id => dispatch => {
  axios
    .get("/api/portal/showtech/" + id)
    .then(res => {
      dispatch({
        type: GET_TECHDATA,
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
