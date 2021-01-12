import {
  GET_TICKET,
  TICKET_ERROR,
  DELETE_TICKET,
  ADD_TICKET,
  GET_TICKETS,
  CLEAR_TICKETS,
} from '../actions/types';

const initialState = {
  ticket: null,
  tickets: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKET:
      return {
        ...state,
        ticket: payload,
        loading: false,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false,
      };

    case ADD_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, payload],
        loading: false,
      };
    case CLEAR_TICKETS:
      return {
        ticket: null,
        tickets: [],
        loading: true,
        error: {},
      };

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket._id !== payload),
        loading: false,
      };
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
