import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTicket } from '../../actions/ticket';

//avatar doesnt work
const TicketItem = ({
  auth,
  deleteTicket,
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
  },
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{user}</h4>
        <img class='round-img' src={avatar} alt='' />
      </Link>
    </div>
    <div>
      <Link to={`/ticket/${_id}`}>
        <h4>{title}</h4>
      </Link>

      <p class='my-1'>{description}</p>
      <p class='post-date'>
        Complete by <Moment format='DD/MM/YYYY'>{completionDate}</Moment>{' '}
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deleteTicket(_id)}
          type='button'
          class='btn btn-danger'
        >
          <i class='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTicket })(TicketItem);
