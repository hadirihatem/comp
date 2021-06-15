import {
  ADDCOMMENT_SUCCESS,
  ADDCOOMENT_FAIL,
  ADDPOST_FAIL,
  GETPOSTS,
  GET_POST,
  ADDLIKE_SUCCESS,
  ADDLIKE_FAIL,
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

export const addPost = (data,file) => (dispatch) => {
  console.log(data,file)
  // const formData= new FormData();
  // formData.append('picture',file);
  // formData.append('data',JSON.stringify(data));
  let formData = new FormData();
  formData.append('picture', file);
  formData.append('data', JSON.stringify(data));
  axios
    .post("http://localhost:4000/post/create", formData)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: ADDPOST_FAIL,
        payload: err?.response?.data?.msg,
      })
    );
};

//------------aadcomment------------------

export const addcomment = (postId, data) => (dispatch) => {
  axios
    .put("http://localhost:4000/comment/:postId ", data)
    .then((res) => {
      return dispatch({
        type: ADDCOMMENT_SUCCESS,
        payload: res.data,
      });
      dispatch(getpost(postId));
    })
    .catch((err) =>
      dispatch({
        type: ADDCOOMENT_FAIL,
        payload: err.response.data.msg,
      })
    );
};

//----------addliketopost---------------------

export const addliketopost = (postId) => (dispatch) => {
  axios
    .put(`http://localhost:4000/postlike/${postId}`)
    .then((res) => {
      return dispatch({
        type: ADDLIKE_SUCCESS,
        payload: res.data,
      });
      dispatch(getpost(postId));
    })
    .catch((err) =>
      dispatch({
        type: ADDLIKE_FAIL,
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
