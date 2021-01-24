import {
  GET_TICKET,
  TICKET_ERROR,
  DELETE_TICKET,
  ADD_TICKET,
  GET_TICKETS,
  CLEAR_TICKETS,
  CLEAR_TICKET,
  QUOTE_TICKET,
  REMOVE_QUOTE,
  QUOTE_ERROR,
  QUOTE_ACCEPTED,
  QUOTE_UPDATED,
  TICKET_COMPLETE_USER,
  LEFT_REVIEW,
  TICKET_REDO_COMPLETE_USER,
  TICKET_REDO_COMPLETE_TRADER,
  TICKET_COMPLETE_TRADER,
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

    case CLEAR_TICKET:
      return {
        ...state,
        ticket: null,
        loading: false,
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
    case QUOTE_TICKET:
    case QUOTE_ACCEPTED:
    case QUOTE_UPDATED:
      return {
        ...state,
        ticket: { ...state.ticket, quotes: payload },
        loading: false,
      };
    case TICKET_COMPLETE_USER:
    case TICKET_REDO_COMPLETE_USER:
    case TICKET_REDO_COMPLETE_TRADER:
    case TICKET_COMPLETE_TRADER:
      return {
        ...state,
        ticket: { ...state.ticket, ticket: payload },
        loading: false,
      };

    case REMOVE_QUOTE:
      return {
        ...state,
        ticket: {
          ...state.quote,
          quotes: state.ticket.quotes.filter((quote) => quote._id !== payload),
        },
        loading: false,
      };
    case LEFT_REVIEW:
      return {
        ...state,
      };
    case QUOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
