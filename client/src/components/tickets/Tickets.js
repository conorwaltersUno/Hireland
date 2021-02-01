import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyTickets } from '../../actions/ticket';
import TicketItem from './TicketItem';

const Ticket = ({ getMyTickets, auth, ticket: { tickets, loading } }) => {
  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  const [filteredTicket, setFilter] = useState('');

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tickets</h1>
      <p className='lead'>
        <i className='fas fa-ticket'></i> Welcome to Hireland
      </p>
      {!auth.loading && !auth.user.isTrader && (
        <Link to='/ticket/create' className='btn btn-primary'>
          Create a Ticket
        </Link>
      )}
      <input onChange={(e) => onChange(e)} placeholder='search by title' />

      {!auth.loading && auth.user.isTrader ? (
        !filteredTicket ? (
          <div className='tickets'>
            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div>
            {tickets.map((ticket) => {
              if (ticket.title.toLowerCase().includes(filteredTicket)) {
                return (
                  <div>
                    <TicketItem key={ticket._id} ticket={ticket} />
                  </div>
                );
              }
            })}
          </div>
        )
      ) : !auth.loading && !filteredTicket ? (
        tickets.map((ticket) => {
          if (ticket.user === auth.user._id)
            return <TicketItem key={ticket._id} ticket={ticket} />;
        })
      ) : (
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
