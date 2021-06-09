import {
  AADCOMMENT_SUCCESS,
  AADCOOMENT_FAIL,
  ADDPOST_FAIL,
  GETPOSTS,
  GET_POST,
  AADLIKE_SUCCESS,
  AADLIKE_FAIL,
  MOST_LIKED_POST,
  LIKEPOST_ERROR,
  GETBYDATE,
} from "./type";
import axios from "axios";

//-----------getposts---------------

export const getPosts = () => (dispatch) => {
  axios.get("http://localhost:4000/posts").then((res) => {
    return dispatch({
      type: GETPOSTS,
      payload: res.data,
    });
  });
};
//-------------------getpost-------------

export const getpost = (post_id) => (dispatch) => {
  axios.get(`http://localhost:4000/post/${post_id}`).then((res) => {
    return dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};


//-----------getpostbydate------------------

export const getpostbydate = () => (dispatch) => {
  axios.get("http://localhost:4000/post/date").then((res) => {
    dispatch({
      type: GETBYDATE,
      payload: res.data,
    });
  });
};

//-------------------aadpost----------------

export const addPost = (data) => (dispatch) => {
  axios
    .post("http://localhost:4000/post/create", data)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: ADDPOST_FAIL,
        payload: err.response.data.msg,
      })
    );
};

//------------aadcomment------------------

export const aadcomment = (postId, data) => (dispatch) => {
  axios
    .put("http://localhost:4000/comment/:postId ", data)
    .then((res) => {
      return dispatch({
        type: AADCOMMENT_SUCCESS,
        payload: res.data,
      });
      dispatch(getpost(postId));
    })
    .catch((err) =>
      dispatch({
        type: AADCOOMENT_FAIL,
        payload: err.response.data.msg,
      })
    );
};

//----------aadliketopost---------------------

export const aadliketopost = (postId) => (dispatch) => {
  axios
    .put(`http://localhost:4000/postlike/${postId}`)
    .then((res) => {
      return dispatch({
        type: AADLIKE_SUCCESS,
        payload: res.data,
      });
      dispatch(getpost(postId));
    })
    .catch((err) =>
      dispatch({
        type: AADLIKE_FAIL,
        payload: err.response.data.msg,
      })
    );
};

//------------postmostiked----------------

export const postmostiked = () => (dispatch) => {
  axios
    .get("http://localhost:4000/post/mostliked")
    .then((res) => {
      dispatch({ type: MOST_LIKED_POST, payload: res.data });
    })

    .catch((err) =>
      dispatch({
        type: LIKEPOST_ERROR,
        payload: err.response.data.msg,
      })
    );
};


//----------------on drop ------------------



// export const onDrop =(files)=>{
//   let formData = new formData ();
//   const config ={
//   header : {'content-type' :'multipart/form-data'}
//   }
//  formData.append("file",files[0])
//  axios.post ('http://localhost:4000/post/multer',formData, config)
//  .then (res=>{
//      if (res.data.success){

//      }else{alert ('failed to save the upload in server')}
//  })
// }
