import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyTickets, getMyTicket } from '../../actions/ticket';
import TicketItem from './TicketItem';

const Ticket = ({ getMyTickets, auth, ticket: { tickets, loading } }) => {
  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tickets</h1>
      <p className='lead'>
        <i className='fas fa-ticket'></i> Welcome to Hireland
      </p>

      <Link to='/ticket/create' className='btn btn-primary'>
        Create a Ticket
      </Link>

      {auth.user.isTrader ? (
        <div className='tickets'>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div>
          {tickets.map((ticket) => {
            if (ticket.user === auth.user._id) {
              return <TicketItem key={ticket._id} ticket={ticket} />;
            }
          })}
        </div>
      )}
    </Fragment>
  );
};

Ticket.propTypes = {
  getMyTickets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getMyTickets })(Ticket);
