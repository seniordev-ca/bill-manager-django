import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// GET CUSTOMERS
export const getCustomers = () => (dispatch, getState) => {
  axios
    .get("/api/clients/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET LEADS
export const getClients = () => (dispatch, getState) => {
  axios
    .get("/api/clients/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEAD
export const deleteClient = id => (dispatch, getState) => {
  axios
    .delete(`/api/clients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteClient: "Client Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD LEAD
export const addClient = lead => (dispatch, getState) => {
  axios
    .post("/api/clients/", lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addClient: "Client Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
