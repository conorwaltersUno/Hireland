import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  acceptQuote,
  revertAcceptQuote,
  CompleteTicketUser,
} from '../../actions/ticket';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import ReviewTrader from './ReviewTrader';
import Spinner from '../layout/Spinner';

const QuoteDisplay = ({
  acceptQuote,
  revertAcceptQuote,
  CompleteTicketUser,

  quotes: { _id, name, quote, isAccepted, user },
  ticket,
  auth,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    acceptQuote(ticket._id, _id);
  };
  const onRevert = (e) => {
    e.preventDefault();
    revertAcceptQuote(ticket._id, _id);
  };

  const onComplete = (e) => {
    e.preventDefault();
    CompleteTicketUser(ticket._id);
  };

  // const onRedoComplete = (e) => {
  //   e.preventDefault();
  //   RedoCompleteTicketUser(ticket._id);
  // };

  return ticket.loading && quote ? (
    <Spinner />
  ) : (
    <div className='profile-top bg-primary p-2'>
      <div>
        <h2>Trader's name:</h2>
        <Link to={`/profile/${user}`}>
          <h4 className='link-text'>{name}</h4>
        </Link>
        <h2>Quoted price</h2>
        <div>{quote}</div>
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
              <ReviewTrader user={user}></ReviewTrader>

              <diV>
                You have marked this ticket as complete, please contact a member
                of the team if you want to reduce it!
              </diV>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

QuoteDisplay.propTypes = {
  ticket: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  acceptQuote: PropTypes.func.isRequired,
  revertAcceptQuote: PropTypes.func.isRequired,
  CompleteTicketUser: PropTypes.func.isRequired,
};

export default connect(null, {
  acceptQuote,
  revertAcceptQuote,
  CompleteTicketUser,
})(QuoteDisplay);
