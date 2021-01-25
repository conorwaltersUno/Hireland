import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTicketById } from '../../actions/ticket';
import Spinner from '../layout/Spinner';
import { clearTicket } from '../../actions/ticket';
import TicketDisplay from './TicketDisplay';
import QuoteForm from '../ticket-forms/QuoteForm';
import QuoteDisplay from './QuoteDisplay';
import { Link } from 'react-router-dom';

/* This class is used when a user clicks on a ticket from the main ticket page*/
const TicketByID = ({
  getTicketById,
  auth,
  match,
  ticket: { ticket, loading },
}) => {
  useEffect(() => {
    getTicketById(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  let accepted = false;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {ticket != null && (
        <div>
          {!loading && ticket && (
            <div className='profile-top bg-primary p-2'>
              <TicketDisplay ticket={ticket} />
            </div>
          )}
          {!auth.loading && auth.user._id === ticket.user && (
            <div>
              {' '}
              <Link to='/edit-ticket' className='btn btn-white'>
                Edit ticket
              </Link>
            </div>
          )}
          {auth.user != null &&
          auth.user.isTrader &&
          !ticket.isCompleteTrader ? (
            <div>
              <QuoteForm ticketId={match.params.id} />
            </div>
          ) : (
            ticket && (
              <div>
                {ticket.quotes.map((quotes) => {
                  if (quotes.isAccepted === true) {
                    accepted = true;
                    return (
                      <QuoteDisplay
                        quotes={quotes}
                        auth={auth}
                        ticket={ticket}
                      />
                    );
                  }
                })}
                {ticket.quotes.map((quotes) => {
                  if (accepted === false) {
                    return (
                      <QuoteDisplay
                        quotes={quotes}
                        auth={auth}
                        ticket={ticket}
                      />
                    );
                  }
                })}
              </div>
            )
          )}
        </div>
      )}
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
