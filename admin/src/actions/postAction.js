import axios from "axios";
import { GET_ERRORS } from "../actions/types";
import { GET_POST } from "../actions/types";

//import setAuthToken from "../token/authtoken";

//--------------Create Task -------------------------
export const createPost = (postData) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .post(`post/create`, postData)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { post: "Post Created succesfully" },
      });
      dispatch(getPostsList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Get Tasks List-------------------

export const getPostsList = () => (dispatch) => {
  axios
    .get(`/posts`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
      });
      // console.log(err);
    });
};

//--------------Edit Task----------------
export const editPost= (postData, id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .put(`/posts/${id}`, postData)
    .then((res) => {
      dispatch(getPostsList());
      dispatch({
        type: GET_ERRORS,
        payload: { post: "Post Updated" },
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Delete Task--------------------
export const deletePost = (id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .delete(`/post/${id}`)
    .then((res) => {
      dispatch(getPostsList());
      dispatch({
        type: GET_ERRORS,
        payload: { post: "Post Deleted" },
      });
      dispatch(getPostsList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
