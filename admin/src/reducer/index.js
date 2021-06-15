import { combineReducers } from "redux";
import postReducer from "./post"
import groupeReducer from "./groupe"
import userReducer from "./user"
import loginReducer from "./loginReducer"

export default combineReducers({
  userReducer: userReducer,
  groupeReducer: groupeReducer,
  postReducer: postReducer,
  loginReducer : loginReducer,
});
