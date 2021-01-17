import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const HomePage = ({ auth: { loading, user } }) => {
  const [formData, setFormData] = useState({
    jobType: '',
    location: '',
  });

  const { jobType, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const traderHomePage = <div>Trader Home Page</div>;

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const urllink =
    '/ticket/create/' + formData.jobType + '/' + formData.location;

  const customerHomePage = (
    <Fragment>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <div>Welcome to Hireland</div>
          <div>
            The online platofrm that allows you to connect with traders in your
            local area
          </div>
          <div>Please fill in the boxes below and click 'enter' to begin!</div>
          <input
            className='customer-input'
            type='text'
            name='jobType'
            value={jobType}
            onChange={(e) => onChange(e)}
            placeholder='What Job do you want to be completed?'
          ></input>
          <input
            className='customer-date'
            type='text'
            name='location'
            value={location}
            placeholder='Please enter your postcode?'
            onChange={(e) => onChange(e)}
          ></input>
          <Link to={urllink}>Submit</Link>
        </div>
      </form>
    </Fragment>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {user && (
        <Fragment>{user.isTrader ? traderHomePage : customerHomePage}</Fragment>
      )}
    </Fragment>
  );
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(HomePage);
