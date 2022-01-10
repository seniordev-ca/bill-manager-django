import { GET_CUSTOMERS, GET_CUSTOMERS_FAILED, SET_SELECTED } from "../actions/types";

const initialState = {
  status: "fail",
  customers: [],
  selected: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        status: "success",
        customers: action.payload
      };
    case GET_CUSTOMERS_FAILED:
      return {
        ...state,
        status: "fail"
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
}
