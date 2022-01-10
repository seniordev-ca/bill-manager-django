import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_INFO, GET_INFO_FAILED, GET_CUSTOMERS, GET_CUSTOMERS_FAILED, SET_SELECTED } from "./types";

// GET INFO
export const getInfo = (tag) => (dispatch, getState) => {
  axios
    .get("/api/info/", {
      params: {
        tag
      },
      headers: tokenConfig(getState).headers
    })
    .then(res => {
      dispatch({
        type: GET_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_INFO_FAILED
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// GET CUSTOMERS
export const getCustomers = () => (dispatch, getState) => {
  axios
    .get("/api/customers/", {
      headers: tokenConfig(getState).headers
    })
    .then(res => {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CUSTOMERS_FAILED
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// SET SELECTED
export const setSelected = (selected) => (dispatch) => {
  dispatch({
    type: SET_SELECTED,
    payload: selected
  });
};
