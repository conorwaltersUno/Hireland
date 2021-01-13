import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTicket, getMyTickets } from '../../actions/ticket';

const EditTicket = ({
  ticket: { ticket, loading },
  createTicket,
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
    getMyTickets();

    setFormData({
      jobType: loading || !ticket.jobType ? '' : ticket.jobType,
      title: loading || !ticket.title ? '' : ticket.title,
      location: loading || !ticket.location ? '' : ticket.location,
      description: loading || !ticket.description ? '' : ticket.description,
      completionDate:
        loading || !ticket.completionDate ? '' : ticket.completionDate,
    });
    // eslint-disable-next-line
  }, [loading]);

  const { jobType, title, location, description, completionDate } = formData;

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
          <input
            type='text'
            placeholder='eg. plumbing, roofing,
            gardening, landscaping'
            name='jobType'
            value={jobType}
            onChange={(e) => onChange(e)}
          />
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
          <input
            type='text'
            placeholder='eg. Antrim, Belfast '
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
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
      </form>
    </Fragment>
  );
};

EditTicket.propTypes = {
  createTicket: PropTypes.func.isRequired,
  getMyTickets: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { createTicket, getMyTickets })(
  withRouter(EditTicket)
);
