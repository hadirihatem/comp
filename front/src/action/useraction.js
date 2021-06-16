import {
    GET_USER_ERRORS,
    UPLOAD_PICTURE,
    UPDATEUSER_SUCCES,
    UPDATEUSER_FAIL,
    GETUSERS_SUCCESS,
    GETUSERS_FAIL,
}from './type'
import axios from "axios";


//-------------------upoladavatar------------



export const uploadPicture = (data, id) => {
    return (dispatch) => {
      return axios
        .post("http://localhost:4000/upload", data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return axios
              .get(`http://localhost:4000/users/${id}`)
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              });
          }
        })
        .catch((err) => console.log(err));
    };
  };



export const updateuser=(data , id)=>(dispatch)=>{
  axios.put(`http://localhost:4000/users/${id}`, data, id)
  .then((res) => {
    dispatch(getUsersList());
    dispatch({
      type: UPDATEUSER_SUCCES,
      payload: { user: "User Updated" },
    });
  })
  .catch((err) =>
    dispatch({
      type: UPDATEUSER_FAIL,
      payload: err.response.data,
    })
  );
};

//--------------------

export const getUsersList = () => (dispatch) => {
  axios
    .get(`http://localhost:4000/users`)
    .then((res) => {
      dispatch({
        type: GETUSERS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GETUSERS_FAIL,
      });
      // console.log(err);
    });
};