import { UPLOAD_PICTURE, LOAD_USER_SUCCESS } from "..";
let initialState = {
  token: localStorage.getItem("token"),
  avatar: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        avatar: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
