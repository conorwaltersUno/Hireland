import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTicketById } from '../../actions/ticket';
import Spinner from '../layout/Spinner';
import { clearTicket } from '../../actions/ticket';
import TicketDisplay from './TicketDisplay';
import QuoteForm from '../ticket-forms/QuoteForm';
import QuoteDisplay from './QuoteDisplay';

/* This class is used when a user clicks on a ticket from the main ticket page*/
const TicketByID = ({
  getTicketById,
  auth: { user },
  match,
  ticket: { ticket, loading },
}) => {
  useEffect(() => {
    getTicketById(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  if (ticket) {
    console.log(ticket.quotes);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        {!loading && ticket && (
          <div className='profile-top bg-primary p-2'>
            <TicketDisplay ticket={ticket} />
          </div>
        )}
        {user.isTrader ? (
          <div>
            <QuoteForm ticketId={match.params.id} />
          </div>
        ) : (
          ticket && (
            <div>
              {ticket.quotes.map((quotes) => {
                return <QuoteDisplay quotes={quotes} />;
              })}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

TicketByID.propTypes = {
  getTicketById: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  auth: state.auth,
});

//call clearTicket when returning to ticket page to clear the current ticket in state
export default connect(mapStateToProps, { getTicketById, clearTicket })(
  TicketByID
);
