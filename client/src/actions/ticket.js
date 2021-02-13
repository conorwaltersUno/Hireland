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
  QUOTE_ACCEPTED,
  QUOTE_UPDATED,
  TICKET_COMPLETE_USER,
  LEFT_REVIEW,
  TICKET_REDO_COMPLETE_USER,
  TICKET_REVIEWED,
  TICKET_COMPLETE_TRADER,
  EDIT_TICKET,
  GET_TICKET_CREATOR_INFO,
  GET_USER_INFO_ERROR,
  GET_QUOTE_STATUS,
  GET_QUOTE_ERROR,
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

//Create a ticket
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

    dispatch({
      type: ADD_TICKET,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Ticket Updated' : 'Ticket Created'));

    if (!edit) {
      history.push('/tickets');
    }
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update ticket
export const editTicket = (formData, history, ticket) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/ticket/${ticket._id}`, formData, config);

    dispatch({
      type: EDIT_TICKET,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Updated'));
    history.push('/tickets');
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

export const acceptQuote = (ticketid, quoteid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { isAccepted: true };
  try {
    const res = await axios.post(
      `/api/ticket/quote/accepted/${ticketid}/${quoteid}`,
      formData,
      config
    );

    dispatch({
      type: QUOTE_ACCEPTED,
      payload: res.data,
    });

    dispatch(setAlert('Quote Accepted', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const revertAcceptQuote = (ticketid, quoteid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { isAccepted: false };

  try {
    const res = await axios.post(
      `/api/ticket/quote/accepted/${ticketid}/${quoteid}`,
      formData,
      config
    );

    dispatch({
      type: QUOTE_UPDATED,
      payload: res.data,
    });

    dispatch(setAlert('Quote Reverted', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const CompleteTicketUser = (ticketid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { isCompleteUser: true };
  try {
    const res = await axios.post(
      `/api/ticket/completeuser/${ticketid}`,
      formData,
      config
    );

    dispatch({
      type: TICKET_COMPLETE_TRADER,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Completed!', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const RedoCompleteTicketUser = (ticketid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { isCompleteUser: false };
  try {
    const res = await axios.post(
      `/api/ticket/completeuser/${ticketid}`,
      formData,
      config
    );

    dispatch({
      type: TICKET_REDO_COMPLETE_USER,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Completed has been reverted', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const CompleteTicketTrader = (ticketid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { isCompleteTrader: true };
  try {
    const res = await axios.post(
      `/api/ticket/completetrader/${ticketid}`,
      formData,
      config
    );

    dispatch({
      type: TICKET_COMPLETE_USER,
      payload: res.data,
    });

    dispatch(setAlert('Ticket Completed!', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const setReviewBoolean = (ticketid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = { hasreviewed: true };
  try {
    const res = await axios.post(
      `/api/ticket/hasReviewed/${ticketid}`,
      formData,
      config
    );

    dispatch({
      type: TICKET_REVIEWED,
      payload: res.data,
    });

    dispatch(
      setAlert(
        'You have reviewed the trader who completed this job!',
        'success'
      )
    );
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
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

//Review Trader
export const reviewTrader = (user, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const traderprofile = await axios.get(`/api/profile/user/${user}`, config);
    const res = await axios.put(
      `/api/profile/${traderprofile.data._id}/review`,
      formData,
      config
    );

    dispatch({
      type: LEFT_REVIEW,
      payload: res.data,
    });

    dispatch(setAlert('Trader Reviewed', 'success'));
  } catch (err) {
    dispatch({
      type: QUOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTicketCreatorInfo = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${userId}`);
    dispatch({
      type: GET_TICKET_CREATOR_INFO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_INFO_ERROR,
    });
  }
};

export const getQuoteStat = (ticketId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ticket/quote/${ticketId}`);
    dispatch({
      type: GET_QUOTE_STATUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_QUOTE_ERROR,
    });
  }
};
