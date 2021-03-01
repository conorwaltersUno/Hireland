import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reviewTrader, setReviewBoolean } from '../../actions/ticket';

const initialState = {
  description: '',
  score: '',
  username: '',
};

const ReviewTrader = ({ user, reviewTrader, setReviewBoolean, id, auth }) => {
  const [formData, setFormData] = useState(initialState);

  const { description, score, tid, username } = formData;
  formData.tid = id;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
        <textarea
          name='score'
          cols='30'
          rows='5'
          placeholder='Please enter 1 to 5 in this box rating your experience.'
          value={score}
          onChange={onChange}
          required
        />
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
