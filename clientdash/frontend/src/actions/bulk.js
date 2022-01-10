import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";


// send BULK Currents
export const bulkCurrents = currents => (dispatch, getState) => {

  axios
    .post("/api/bulk_currents/", currents, tokenConfig(getState))
    .then(res => {
      console.log(res.data);

      if (res.data === 'Currents Ok') {
        console.log('Congrats! Successfully inserted data.');
        alert('Congrats! Successfully inserted data.');
      }
      else {
        console.log('Sorry, data insert failed.');
        alert('Sorry, data insert failed.');
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// send BULK Historicals
export const bulkHistoricals = historicals => (dispatch, getState) => {

  axios
    .post("/api/bulk_historicals/", historicals, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// send BULK Settings
export const bulkSettings = settings => (dispatch, getState) => {

  axios
    .post("/api/bulk_settings/", settings, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
