import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTicket } from '../../actions/ticket';

const CreateTicket = ({ createTicket, history }) => {
  const [formData, setFormData] = useState({
    jobType: '',
    title: '',
    location: '',
    description: '',
    completionDate: '',
  });

  const { jobType, title, location, description, completionDate } = formData;

  const { jt } = useParams();
  const { l } = useParams();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createTicket(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Ticket</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to build a
        ticket
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {jt && (
            <input
              type='text'
              placeholder='eg. plumbing, roofing,
             gardening, landscaping'
              name='jobType'
              value={jt}
              onChange={(e) => onChange(e)}
            />
          )}
          {!jt && (
            <input
              type='text'
              placeholder='eg. plumbing, roofing,
            gardening, landscaping'
              name='jobType'
              value={jobType}
              onChange={(e) => onChange(e)}
            />
          )}

          <small className='form-text'>* Job Type</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='eg. Boiler Repair, Toilet is clogged'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>* Title</small>
        </div>
        <div className='form-group'>
          {l && (
            <input
              type='text'
              placeholder='Please enter you postcode '
              name='location'
              value={l}
              onChange={(e) => onChange(e)}
            />
          )}
          {!l && (
            <input
              type='text'
              placeholder='Please enter you postcode '
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          )}

          <small className='form-text'>* Location</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='eg. Boiler pressure is too low, A tree need to be chopped down'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>* Description</small>
        </div>
        <div className='form-group'>
          <input
            type='date'
            name='completionDate'
            value={completionDate}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>* Completion Date</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/tickets'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateTicket.propTypes = {
  createTicket: PropTypes.func.isRequired,
};

export default connect(null, { createTicket })(withRouter(CreateTicket));
