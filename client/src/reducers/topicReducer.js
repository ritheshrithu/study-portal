import { GET_TOPICS, REMOVE_TOPICS } from "../actions/types";
const initialState = {
  topics: [],
  data: false,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
        data: true,
        success: true
      };
    case REMOVE_TOPICS:
      return {
        topics: [],
        data: false,
        success: false
      };

    default:
      return state;
  }
}
