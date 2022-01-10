import { combineReducers } from "redux";
import clients from "./clients";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import info from "./info";
import customers from "./customers";

export default combineReducers({
  clients,
  errors,
  messages,
  auth,
  info,
  customers
});
