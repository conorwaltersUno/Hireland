import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTicket } from '../../actions/ticket';

const CreateTicket = ({ createTicket, history, auth }) => {
  const [formData, setFormData] = useState({
    jobType: '',
    title: '',
    location: '',
    description: '',
    completionDate: '',
    avatar: '',
  });

  const { jobType, title, location, description, completionDate } = formData;

  const { jt } = useParams();
  const { l } = useParams();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createTicket(formData, history, auth.user._id);
  };

  useEffect(() => {
    if (jt && l) {
      setFormData({ ...formData, jobType: jt, location: l });
    }
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Ticket</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to build a
        ticket
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-text'>
          {jt && (
            <div className='form-text'>
              <select
                name='jobType'
                value={jobType}
                onChange={(e) => onChange(e)}
              >
                <option value=''>* Please select your job type</option>
                <option value='Brick Laying'>Brick Laying</option>

                <option value='Carpentry'>Carpentry</option>
                <option value='Cleaning'>Cleaning</option>
                <option value='Electrical Installation'>
                  Electrical Installation
                </option>
                <option value='Electrical Repair'>Electrical Repair</option>
                <option value='Flooring'>Flooring</option>
                <option value='Furnishing'>Furnishing</option>
                <option value='General Repairing'>General Repairing</option>
                <option value='Gardening'>Gardening</option>
                <option value='Painting'>Painting</option>
                <option value='Pest Control'>Pest Control</option>
                <option value='Plumbing'>Plumbing</option>
                <option value='Property extension'>Property extension</option>
                <option value='Renovating'>Renovating</option>
                <option value='Structural repair'>Structural repair</option>
                <option value='Windows, Doors and Conservatories'>
                  Pest Control
                </option>
              </select>
            </div>
          )}
          {!jt && (
            <div className='form-text'>
              <select
                name='jobType'
                value={jobType}
                onChange={(e) => onChange(e)}
              >
                <option value=''>* Please select your job type</option>
                <option value='Brick Laying'>Brick Laying</option>

                <option value='Carpentry'>Carpentry</option>
                <option value='Cleaning'>Cleaning</option>
                <option value='Electrical Installation'>
                  Electrical Installation
                </option>
                <option value='Electrical Repair'>Electrical Repair</option>
                <option value='Flooring'>Flooring</option>
                <option value='Furnishing'>Furnishing</option>
                <option value='General Repairing'>General Repairing</option>
                <option value='Gardening'>Gardening</option>
                <option value='Painting'>Painting</option>
                <option value='Pest Control'>Pest Control</option>
                <option value='Plumbing'>Plumbing</option>
                <option value='Property extension'>Property extension</option>
                <option value='Renovating'>Renovating</option>
                <option value='Structural repair'>Structural repair</option>
                <option value='Windows, Doors and Conservatories'>
                  Pest Control
                </option>
              </select>
            </div>
          )}

          <small className='form-text'>* Job Type</small>
        </div>
        <div className='form-text'>
          <input
            type='text'
            placeholder='eg. Boiler Repair, Toilet is clogged'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>* Title</small>
        </div>
        <div className='form-text'>
          {l && (
            <input
              type='text'
              placeholder='Please enter you postcode '
              name='location'
              value={location}
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
        <div className='form-text'>
          <textarea
            placeholder='eg. Boiler pressure is too low, A tree need to be chopped down'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>* Description</small>
        </div>
        <div className='form-text'>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createTicket })(
  withRouter(CreateTicket)
);
