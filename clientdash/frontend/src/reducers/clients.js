import { GET_LEADS, DELETE_LEAD, ADD_LEAD, CLEAR_LEADS } from "../actions/types.js";

const initialState = {
  clients: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        clients: action.payload
      };
    case DELETE_LEAD:
      return {
        ...state,
        clients: state.clients.filter(lead => lead.id !== action.payload)
      };
    case ADD_LEAD:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case CLEAR_LEADS:
      return {
        ...state,
        clients: []
      };
    default:
      return state;
  }
}
