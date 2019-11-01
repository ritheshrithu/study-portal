import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/is-empty";
import isAdmin from "../validations/is-admin";
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  project: "",
  user: {},
  errors: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: isAdmin(action.payload),
        project: action.payload.project,
        user: action.payload
      };
    default:
      return state;
  }
}
