import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTicketById } from '../../actions/ticket';
import Spinner from '../layout/Spinner';
import { clearTicket } from '../../actions/ticket';
import TicketDisplay from './TicketDisplay';
import QuoteForm from '../ticket-forms/QuoteForm';
import { Link } from 'react-router-dom';
import QuoteDisplay from './QuoteDisplay';

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
  }, [ticket]);

  let accepted = false;

  let sortByQuote = [];

  function initialSorted() {
    return 'date';
  }

  //toggle sortedBy drop down
  const [toggle, setToggle] = useState(false);
  //select what to sorted
  const [sortBy, setSortBy] = useState(initialSorted());

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

          <button onClick={() => setToggle(!toggle)}>Sorted By</button>
          {toggle && (
            <div>
              <button onClick={() => setSortBy('date')}>Date</button>
              <button onClick={() => setSortBy('quotes')}>Quote price</button>
              <button onClick={() => setSortBy('review')}>Review</button>
            </div>
          )}

          {auth.user != null &&
          auth.user.isTrader &&
          !ticket.isCompleteTrader ? (
            <div>
              <QuoteForm ticketId={match.params.id} userId={ticket.user} />
            </div>
          ) : ticket.quotes ? (
            <div>
              {ticket.quotes.map((quotes) => {
                if (quotes.isAccepted === true) {
                  accepted = true;
                  return (
                    <div>
                      <Link to={`/profile/${quotes.user}`}>
                        <h4 className='link-text'>{quotes.name}</h4>
                      </Link>
                      <QuoteDisplay
                        quotes={quotes}
                        auth={auth}
                        ticket={ticket}
                      />
                    </div>
                  );
                }
              })}
              {ticket.quotes.map((quotes) => {
                sortByQuote.push(quotes);
                sortByQuote.sort(function (a, b) {
                  return a.quote - b.quote;
                });
                if (accepted === false) {
                  if (sortBy === 'date') {
                    return (
                      <QuoteDisplay
                        quotes={quotes}
                        auth={auth}
                        ticket={ticket}
                      />
                    );
                  }
                  if (
                    sortBy === 'quotes' &&
                    sortByQuote.length === ticket.quotes.length
                  ) {
                    return sortByQuote.map((quotee) => {
                      return (
                        <QuoteDisplay
                          quotes={quotee}
                          auth={auth}
                          ticket={ticket}
                        />
                      );
                    });
                  }
                }
              })}
            </div>
          ) : (
            <div></div>
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
