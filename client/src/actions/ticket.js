import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TICKET,
  DELETE_TICKET,
  GET_TICKET,
  TICKET_ERROR,
  GET_TICKETS,
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
