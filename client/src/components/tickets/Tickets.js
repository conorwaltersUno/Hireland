import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyTickets } from '../../actions/ticket';
import { getCurrentProfile } from '../../actions/profile';
import TicketItem from './TicketItem';

const Ticket = ({
  getMyTickets,
  auth,
  ticket: { tickets, loading },
  profile,
}) => {
  useEffect(() => {
    getMyTickets();
    getCurrentProfile();
  }, [getMyTickets]);

  function initialJobType() {
    return '';
  }

  const [filteredTicket, setFilter] = useState('');

  const [jobType, setJobType] = useState(initialJobType());

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  const onDropChange = (e) => {
    e.preventDefault();
    setJobType(e.target.value);
  };

  let filteredJobType = [];

  if (!auth.loading) {
    if (auth.user) {
      if (profile.profile === null && auth.user.isTrader) {
        return <Redirect to='/profile'></Redirect>;
      }
    } else {
    }
  }

  const pushtoArray = (ticket) => {
    filteredJobType.push(ticket);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tickets</h1>
      <p className='lead'></p>
      {!auth.loading && !auth.user.isTrader && (
        <Link to='/ticket/create' className='btn btn-primary'>
          Create a Ticket
        </Link>
      )}

      {!auth.loading && auth.user.isTrader && (
        <div>
          <select value={jobType} onChange={(e) => onDropChange(e)}>
            <option value=''>* Filter on job type</option>
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
          <input onChange={(e) => onChange(e)} placeholder='search by title' />
        </div>
      )}

      {!auth.loading && auth.user.isTrader ? (
        !jobType && !filteredTicket ? (
          <div className='tickets'>
            {tickets.map((ticket) => {
              if (!ticket.isCompleteUser) {
                return <TicketItem key={ticket._id} ticket={ticket} />;
              }
            })}
          </div>
        ) : jobType ? (
          <div>
            {tickets.map((ticket) => {
              if (ticket.jobType.includes(jobType) && !ticket.isCompleteUser) {
                if (filteredTicket) {
                  if (
                    ticket.title
                      .toLowerCase()
                      .includes(filteredTicket.toLowerCase())
                  ) {
                    return (
                      <div>
                        <TicketItem key={ticket._id} ticket={ticket} />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div>
                      {pushtoArray(ticket)}
                      <TicketItem key={ticket._id} ticket={ticket} />
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          <div>
            {tickets.map((ticket) => {
              if (!ticket.isCompleteUser) {
                if (
                  ticket.title
                    .toLowerCase()
                    .includes(filteredTicket.toLowerCase())
                ) {
                  return (
                    <div>
                      <TicketItem key={ticket._id} ticket={ticket} />
                    </div>
                  );
                }
              }
            })}
          </div>
        )
      ) : !auth.loading && !filteredTicket ? (
        tickets.map((ticket) => {
          if (ticket.user === auth.user._id)
            return <TicketItem key={ticket._id} ticket={ticket} />;
        })
      ) : !auth.loading ? (
        tickets.map((ticket) => {
          if (
            ticket.user === auth.user._id &&
            ticket.title.toLowerCase().includes(filteredTicket)
          ) {
            return (
              <div>
                <TicketItem key={ticket._id} ticket={ticket} />
              </div>
            );
          }
        })
      ) : (
        <Spinner></Spinner>
      )}
    </Fragment>
  );
};

Ticket.propTypes = {
  getMyTickets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
  profile: state.profile,
});

export default connect(mapStateToProps, { getMyTickets, getCurrentProfile })(
  Ticket
);
