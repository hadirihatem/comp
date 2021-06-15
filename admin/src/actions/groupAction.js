import axios from "axios";
import { GET_ERRORS } from "../actions/types";
import { GET_GROUPE } from "../actions/types";

//import setAuthToken from "../token/authtoken";

//--------------Create Event -------------------------
export const createGroupe = (groupData) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .post(`${process.env.REACT_APP_API_URL}/groupe/create`, groupData)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { event: "groupe Created succesfully" },
      });
      dispatch(getGroupesList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Get Projects List-------------------

export const getGroupesList = () => (dispatch) => {
  axios
    .get(`/groupes`)
    .then((res) => {
      dispatch({
        type: GET_GROUPE,
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

//--------------Edit Event----------------
export const editGroupe = (groupData, id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .put(`/groupe/${id}`, groupData)
    .then((res) => {
      dispatch(getGroupesList());
      dispatch({
        type: GET_ERRORS,
        payload: { event: "Event Updated" },
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//---------------Delete Event--------------------
export const deleteGroupe = (id) => (dispatch) => {
  // setAuthToken(localStorage.token);
  axios
    .delete(`/groupe/${id}`)
    .then((res) => {
      dispatch(getGroupesList());
      dispatch({
        type: GET_ERRORS,
        payload: { groupe: "Groupe Deleted" },
      });
      dispatch(getGroupesList());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
