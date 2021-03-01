import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTicket, getMyTickets } from '../../actions/ticket';
import { clearProfile } from '../../actions/profile';
import { Fragment } from 'react';

const TicketItem = ({
  auth,
  deleteTicket,
  clearProfile,
  ticket: {
    _id,
    user,
    title,
    description,
    creationDate,
    isCompleteUser,
    isCompleteTrader,
    quotes,
    avatar,
  },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      {quotes && (
        <Fragment>
          <div>
            <Link to={`/profile/${user}`} onClick={clearProfile}>
              {avatar ? (
                <Fragment>
                  <img className='round-img' src={avatar} />
                </Fragment>
              ) : (
                <div>There is no avatar</div>
              )}
            </Link>
            <div></div>
          </div>
          <div>
            <Link to={`/ticket/${_id}`}>
              <h4>{title}</h4>
            </Link>

            <div style={{ display: 'flex' }}>
              <p style={{ marginRight: '10px', marginTop: '16px' }}>
                Description:
              </p>
              <p className='my-1'>{description}</p>
            </div>
            <p className='post-date'>Quote count: {quotes.length}</p>
            <p className='post-date'>
              Created on <Moment format='DD/MM/YYYY'>{creationDate}</Moment>{' '}
            </p>
            {isCompleteUser && (
              <div>
                {isCompleteTrader && (
                  <div>
                    This ticket has been marked as complete by both the customer
                    and trader
                  </div>
                )}
              </div>
            )}

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deleteTicket(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  getMyTickets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteTicket,
  clearProfile,
  getMyTickets,
})(TicketItem);
