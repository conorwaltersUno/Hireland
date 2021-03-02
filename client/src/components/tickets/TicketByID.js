import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTicketById, getTicketCreatorInfo } from '../../actions/ticket';
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
  getTicketCreatorInfo,
}) => {
  useEffect(() => {
    getTicketById(match.params.id);
    getTicketCreatorInfo(match.params.id);
    // eslint-disable-next-line
  }, []);

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
        <div style={{ maxHeight: '80%' }}>
          {!auth.loading && auth.user._id === ticket.user && (
            <div>
              {' '}
              <Link
                to='/edit-ticket'
                className='btn btn-white'
                style={{ marginBottom: '10px' }}
              >
                Edit ticket
              </Link>
            </div>
          )}
          {!loading && ticket && <TicketDisplay ticket={ticket} />}

          {!auth.loading && auth.user._id === ticket.user && (
            <div>
              {ticket.quotes.length > 0 && (
                <button onClick={() => setToggle(!toggle)}>Sorted By</button>
              )}

              <h2 className='text-primary' style={{ textAlign: 'center' }}>
                Quotes
              </h2>
              {toggle && (
                <div>
                  <button onClick={() => setSortBy('date')}>Quote Date</button>
                  <button onClick={() => setSortBy('quotes')}>
                    Quote price
                  </button>
                </div>
              )}
            </div>
          )}

          {auth.user != null &&
          auth.user.isTrader &&
          !ticket.isCompleteTrader ? (
            <div>
              <QuoteForm ticketId={match.params.id} userId={ticket.user} />
            </div>
          ) : ticket.quotes ? (
            <div style={{ maxHeight: '790px', overflowY: 'scroll' }}>
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
                      <div>
                        <QuoteDisplay
                          quotes={quotes}
                          auth={auth}
                          ticket={ticket}
                        />
                      </div>
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
  getTicketCreatorInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  auth: state.auth,
});

//call clearTicket when returning to ticket page to clear the current ticket in state
export default connect(mapStateToProps, {
  getTicketById,
  clearTicket,
  getTicketCreatorInfo,
})(TicketByID);
