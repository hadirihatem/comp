import axios from "axios";
import { GET_ERRORS } from "../actions/types";
import { GET_USERS } from "../actions/types";

//import setAuthToken from "../token/authtoken";

//--------------Create User -------------------------
export const createUser = (userData) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .post(`/user/create`, userData)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { user: "User Created succesfully" },
      });
      dispatch(getUsersList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Get Projects List-------------------

export const getUsersList = () => (dispatch) => {
  axios
    .get(`/users`)
    .then((res) => {
      dispatch({
        type: GET_USERS,
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

//--------------Edit User----------------
export const editUser = (userData, id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .put(`/users/${id}`, userData)
    .then((res) => {
      dispatch(getUsersList());
      dispatch({
        type: GET_ERRORS,
        payload: { user: "User Updated" },
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Delete User--------------------
export const deleteUser = (id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .delete(`/users/${id}`)
    .then((res) => {
      dispatch(getUsersList());
      dispatch({
        type: GET_ERRORS,
        payload: { user: "User Deleted" },
      });
      dispatch(getUsersList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
