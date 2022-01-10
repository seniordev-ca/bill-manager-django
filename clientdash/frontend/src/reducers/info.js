import { GET_INFO, GET_INFO_FAILED } from "../actions/types.js";

const initialState = {
  status: "fail",
  info: {
    client: {
      id: "",
      billTo1: "",
      billTo2: "",
      billTo3: "",
      billTo4: "",
      phone: "",
      fax: "",
      email: ""
    },
    
    invoice: 0,
    
    dateDue: "",
    gas: {
      prev: 0,
      current: 0,
      therms: 0.0,
      rate: 0.0,
      amount: 0.0
    },

    payableTo: "",

    notice: "",

    gasCost: [
      /*{
        date: "",
        amount: 0.0
      }*/
    ]
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INFO:
      return {
        ...state,
        status: "success",
        info: action.payload
      };
    case GET_INFO_FAILED:
      return {
        ...state,
        status: "fail"
      };
    default:
      return state;
  }
}
