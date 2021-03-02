import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  acceptQuote,
  revertAcceptQuote,
  CompleteTicketUser,
  getQuoteStat,
} from '../../actions/ticket';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReviewTrader from './ReviewTrader';
import Spinner from '../layout/Spinner';
import emailjs from 'emailjs-com';

const QuoteDisplay = ({
  acceptQuote,
  getQuoteStat,
  revertAcceptQuote,
  CompleteTicketUser,
  quotes: { _id, name, quote, isAccepted, user },
  ticket,
  auth,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setAccept(() => !accept);
    acceptQuote(ticket._id, _id);
    window.location.reload();
  };
  const onRevert = (e) => {
    e.preventDefault();
    setAccept(() => !accept);
    revertAcceptQuote(ticket._id, _id);
    window.location.reload();
  };

  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  }

  let averageQuote = 0;
  let uniqueTrader = [];
  ticket.quotes.map((quote) => {
    averageQuote += parseInt(quote.quote);
    uniqueTrader.push({ name: quote.name, email: quote.email });
  });

  averageQuote = parseFloat(averageQuote / ticket.quotes.length);

  if (uniqueTrader) {
    uniqueTrader = getUnique(uniqueTrader, 'email');
  }

  const onComplete = (e) => {
    e.preventDefault();
    setAccept(() => !accept);
    CompleteTicketUser(ticket._id);
    uniqueTrader.map((trader) => {
      emailjs.send(
        'service_er09efl',
        'template_rt85qsh',
        {
          from_name: 'Hireland',
          to_name: trader.name,
          message: averageQuote,
          //traders' emial
          to_email: trader.email,
          //to_email: 'jialianglee98@gmail.com',
          reply_to: quote,
          quote_count: ticket.quotes.length,
          trader_count: uniqueTrader.length,
        },
        'user_0BKx8SUrYQ0Ldp57gHVyV'
      );
    });
  };

  const [accept, setAccept] = useState(false);

  useEffect(() => {
    getQuoteStat(ticket._id);
  }, [accept]);

  return ticket.loading && quote ? (
    <Spinner />
  ) : (
    <div className='quote-top bg-primary p-2'>
      <div>
        <h2>Trader's name:</h2>
        <Link to={`/profile/${user}`}>
          <h4 className='link-text'>{name}</h4>
        </Link>
        <h2>Quoted price</h2>
        <div>£ {quote}</div>
      </div>
      {!auth.loading && ticket.user === auth.user._id && (
        <div>
          {ticket.isCompleteUser === false && (
            <div>
              {!isAccepted && (
                <button
                  onClick={(e) => onSubmit(e)}
                  type='button'
                  className='btn btn-success'
                >
                  Accept Quote <a> </a>
                  <i className='fas fa-check'></i>
                </button>
              )}

              {isAccepted && (
                <Fragment>
                  <div>This quote has been accepted</div>
                  <button
                    onClick={(e) => onRevert(e)}
                    type='button'
                    className='btn btn-danger'
                  >
                    Revert Quote Accept
                  </button>
                  <button
                    onClick={(e) => onComplete(e)}
                    type='button'
                    className='btn btn-success'
                  >
                    Mark this job as completed!
                  </button>
                </Fragment>
              )}
            </div>
          )}
          {ticket.isCompleteUser === true && (
            <Fragment>
              {!ticket.hasreviewed && ticket._id ? (
                <ReviewTrader user={user} id={ticket._id}></ReviewTrader>
              ) : (
                <div></div>
              )}

              <div>
                You have marked this ticket as complete, please contact a member
                of the team if you want to re-do this action!
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

QuoteDisplay.propTypes = {
  ticket: PropTypes.object.isRequired,
  quotes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  acceptQuote: PropTypes.func.isRequired,
  revertAcceptQuote: PropTypes.func.isRequired,
  CompleteTicketUser: PropTypes.func.isRequired,
  getQuoteStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket.ticket,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  acceptQuote,
  revertAcceptQuote,
  CompleteTicketUser,
  getQuoteStat,
})(QuoteDisplay);
