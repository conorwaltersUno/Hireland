import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_PROFILE,
  GET_MAP_LOCATION,
  GET_ALL_PROFILE,
  GET_TICKET_MAP_LOCATION,
  TICKET_ERROR,
} from './types';
import axiosConfig from './axiosConfig';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Places longitude and latitude for a profile returned from get request into state using dispatch method
export const getProfileMapLocation = (location) => async (dispatch) => {
  try {
    const res = await axiosConfig.get(
      `http://api.postcodes.io/postcodes/${location}`
    );
    dispatch({
      type: GET_MAP_LOCATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Places longitude and latitude for a ticket returned from get request into state using dispatch method
export const getTicketMapLocation = (location) => async (dispatch) => {
  try {
    const res = await axiosConfig.get(
      `http://api.postcodes.io/postcodes/${location}`
    );
    dispatch({
      type: GET_TICKET_MAP_LOCATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Create or update ticket
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: ADD_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/profile');
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

//clearProfile
export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};

//getallprofiles
export const getallProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/');

    dispatch({
      type: GET_ALL_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//clearallprofiles
