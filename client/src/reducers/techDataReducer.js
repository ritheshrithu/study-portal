import {
  GET_TECHDATA,
  REMOVE_TOPICS,
  REMOVE_TOPICDATA
} from "../actions/types";
const initialState = {
  tech: "",
  data: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TECHDATA:
      return {
        ...state,
        tech: action.payload,
        data: true
      };
    case REMOVE_TOPICDATA:
      return {
        tech: "",
        data: false
      };

    default:
      return state;
  }
}
