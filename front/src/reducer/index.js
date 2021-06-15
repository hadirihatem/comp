import {combineReducers} from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
// import errorReducer from './error.reducer';

export default combineReducers({auth: authReducer ,posts:postReducer })