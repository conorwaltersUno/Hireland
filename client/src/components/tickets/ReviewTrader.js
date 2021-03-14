import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reviewTrader, setReviewBoolean } from '../../actions/ticket';
import ReactStars from 'react-rating-stars-component';

const initialState = {
  description: '',
  score: '',
  username: '',
};

const reviewStars = {
  size: 40,
  count: 5,
  value: 7.5,
  a11y: true,
  isHalf: true,
  emptyIcon: <i className='far fa-star' />,
  halfIcon: <i className='fa fa-star-half-alt' />,
  filledIcon: <i className='fa fa-star' />,
};

const ReviewTrader = ({ user, reviewTrader, setReviewBoolean, id, auth }) => {
  const [formData, setFormData] = useState(initialState);

  const { description } = formData;
  formData.tid = id;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onReviewChange = (e) => setFormData({ ...formData, score: e });

  const onSubmit = (e) => {
    e.preventDefault();
    if (auth) {
      formData.username = auth.user.name;
    }
    reviewTrader(user, formData);
    setReviewBoolean(formData.tid);
  };

  return (
    <div>
      <div>
        <h3>Review Trader</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='description'
          cols='30'
          rows='5'
          placeholder='Describe your experience with this trader.'
          value={description}
          onChange={onChange}
          required
        />
        <ReactStars onChange={onReviewChange} {...reviewStars} />

        <input type='submit' value='submit' />
      </form>
    </div>
  );
};

ReviewTrader.propTypes = {
  user: PropTypes.object.isRequired,
  reviewTrader: PropTypes.func.isRequired,
  setReviewBoolean: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { reviewTrader, setReviewBoolean })(
  ReviewTrader
);
