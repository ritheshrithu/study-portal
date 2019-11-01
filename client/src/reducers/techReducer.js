import { GET_TECHS, REMOVE_TECHS } from "../actions/types";
const initialState = {
  techs: [],
  data: false,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        data: true,
        success: true
      };
    case REMOVE_TECHS:
      return {
        techs: [],
        data: false,
        success: false
      };
    default:
      return state;
  }
}
