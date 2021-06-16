import {
  ADDPOST_SUCCESS,
  ADDPOST_FAIL,
  GETPOSTS,
  GET_POST,
  GETBYDATE,
  MOST_LIKED_POST,
  LIKEPOST_ERROR,
} from "../action/type";
let initState = {
  posts: [],
  post: null,
  isLoading: false,
  errors: {},

};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case ADDPOST_SUCCESS:
    case GET_POST:
    case GETBYDATE:
      return {
        ...state,
        post: action.payload,
        errors: {},
        isLoading: false,
        
      };
    case GETPOSTS:
    case MOST_LIKED_POST:
      return {
        ...state,
        posts: action.payload,
        errors: {},
        isLoading: false,
     
      };

    case ADDPOST_FAIL:
    case LIKEPOST_ERROR:
      return {
        ...state,
        errors: action.payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default PostReducer;
