import axios from "axios";
import { GET_ERRORS, GET_TECHS } from "./types";

export const getTechs = id => dispatch => {
  axios
    .get("/api/portal/getbytopic/" + id)
    .then(res => {
      dispatch({
        type: GET_TECHS,
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
