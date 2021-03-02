import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTicket, getMyTickets } from '../../actions/ticket';

const EditTicket = ({
  ticket: { ticket, loading },
  editTicket,
  getMyTickets,
  history,
}) => {
  const [formData, setFormData] = useState({
    jobType: '',
    title: '',
    location: '',
    description: '',
    completionDate: '',
  });

  // Edit doesnt carry information from getMyTickets, becase ticket is store in array.
  useEffect(() => {
    if (!loading && ticket) {
      setFormData({
        jobType: loading || !ticket.jobType ? '' : ticket.jobType,
        title: loading || !ticket.title ? '' : ticket.title,
        location: loading || !ticket.location ? '' : ticket.location,
        description: loading || !ticket.description ? '' : ticket.description,
        completionDate:
          loading || !ticket.completionDate ? '' : ticket.completionDate,
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  //if the user refreshes from the edit tickets page, we have no way of getting the ticket from state so the webpage cant be refreshed.
  if (ticket === null) {
    return <Redirect to='/homepage'></Redirect>;
  }

  const { jobType, title, location, description, completionDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    if (ticket) {
      e.preventDefault();
      editTicket(formData, history, ticket);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Ticket</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Change any information you wish!
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-text'>
          <select name='jobType' value={jobType} onChange={(e) => onChange(e)}>
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
          <input
            type='text'
            placeholder='eg. Antrim, Belfast '
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
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
      </form>
    </Fragment>
  );
};

EditTicket.propTypes = {
  editTicket: PropTypes.func.isRequired,
  getMyTickets: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { editTicket, getMyTickets })(
  withRouter(EditTicket)
);
