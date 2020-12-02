import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyTickets } from '../../actions/ticket';
import TicketItem from './TicketItem';

const Ticket = ({
  getMyTickets,
  auth: { user },
  ticket: { tickets, loading },
}) => {
  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  const temp = tickets;

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

      <div className='tickets'>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
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
