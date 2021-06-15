import { GET_POST } from "../actions/types";

const initialState = {
  posts: [],
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}
