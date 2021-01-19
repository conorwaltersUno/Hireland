import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TICKET,
  DELETE_TICKET,
  GET_TICKET,
  TICKET_ERROR,
  GET_TICKETS,
  CLEAR_TICKETS,
  CLEAR_TICKET,
  QUOTE_TICKET,
  REMOVE_QUOTE,
  QUOTE_ERROR,
} from './types';

export const getMyTickets = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ticket');

    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      //payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMyTicket = () => async (dispatch) => {
  try {
    const res = await axios.get('api/ticket/me');

    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
    });
  }
};

//Create or update ticket
export const createTicket = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/ticket', formData, config);

    console.log(formData.jobType);

    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Ticket Updated' : 'Ticket Created'));

    if (!edit) {
      history.push('/ticket');
    }
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Ticket
export const deleteTicket = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/ticket/${id}`);

    dispatch({
      type: DELETE_TICKET,
      payload: id,
    });

    dispatch(setAlert('Ticket Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD Ticket
export const addTicket = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('api/ticket', formData, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Created', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTicketById = (ticketId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ticket/${ticketId}`);
    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      //payload: { msg: err.response, status: err.response.status },
    });
  }
};

export const clearTickets = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_TICKETS,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearTicket = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_TICKET,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Quote Ticket
export const quoteTicket = (ticketId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `/api/ticket/quote/${ticketId}`,
      formData,
      config
    );

    dispatch({
      type: QUOTE_TICKET,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Quoted', 'success'));
  } catch (err) {
    dispatch({
      type: QUOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE Quote
export const deleteQuote = (ticketId, quoteId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tickets/quote/${ticketId}/${quoteId}`);

    dispatch({
      type: REMOVE_QUOTE,
      payload: quoteId,
    });

    dispatch(setAlert('Quote Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
