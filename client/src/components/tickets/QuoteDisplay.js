import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { acceptQuote, revertAcceptQuote } from '../../actions/ticket';
import { Fragment } from 'react';

const QuoteDisplay = ({
  acceptQuote,
  revertAcceptQuote,
  quotes: { _id, name, quote, isAccepted },
  ticket,
  auth: { user },
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    acceptQuote(ticket._id, _id);
  };
  const onRevert = (e) => {
    e.preventDefault();
    //revert the quote accept so call action to set isAccepted back to false and then display all quotes again
    revertAcceptQuote(ticket._id, _id);
  };

  return (
    <div className='profile-top bg-primary p-2'>
      <h2>Trader's name:</h2>
      {name}
      <h2>Quoted price</h2>
      <div>{quote}</div>

      {!ticket.loading && user != null && ticket.user === user._id && (
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
};

export default connect(null, { acceptQuote, revertAcceptQuote })(QuoteDisplay);
