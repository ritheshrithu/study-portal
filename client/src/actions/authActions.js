import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  REMOVE_TOPICS,
  REMOVE_TECHS
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { getTopics } from "./topicActions";

import jwt_decode from "jwt-decode";

export const SignupUser = userData => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => {
      //set to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set to auth header
      setAuthToken(token);

      //decode
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      //set to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set to auth header
      setAuthToken(token);

      //decode
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const removeTopics = () => {
  return {
    type: REMOVE_TOPICS,
    payload: ""
  };
};

export const removeTechs = () => {
  return {
    type: REMOVE_TECHS,
    payload: ""
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(removeTopics({}));
  dispatch(removeTechs({}));
  dispatch(setCurrentUser({}));
};
