import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTicket } from '../../actions/ticket';
import { clearProfile } from '../../actions/profile';

//avatar doesnt work
const TicketItem = ({
  auth,
  deleteTicket,
  clearProfile,
  ticket: {
    _id,
    user,
    jobType,
    title,
    location,
    description,
    completionDate,
    creationDate,
    avatar,
    isCompleteUser,
    isCompleteTrader,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`} onClick={clearProfile}>
        <h4>{user}</h4>
        <img className='round-img' src={avatar} alt='' />
      </Link>
    </div>
    <div>
      <Link to={`/ticket/${_id}`}>
        <h4>{title}</h4>
      </Link>

      <p className='my-1'>{description}</p>
      <p className='post-date'>
        Complete by <Moment format='DD/MM/YYYY'>{completionDate}</Moment>{' '}
      </p>
      {isCompleteUser && (
        <div>
          {isCompleteTrader && (
            <div>
              This ticket has been marked as complete by both the customer and
              trader
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
  </div>
);

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTicket, clearProfile })(
  TicketItem
);
