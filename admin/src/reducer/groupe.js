import { GET_GROUPE } from "../actions/types";

const initialState = {
  groupes: [],
};
export default function groupes(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPE:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
}
