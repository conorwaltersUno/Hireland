import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { getMyTickets } from '../../actions/ticket';
import QuoteDisplay from '../tickets/QuoteDisplay';

const HomePage = ({ getMyTickets, auth, ticket }) => {
  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  const [formData, setFormData] = useState({
    jobType: '',
    location: '',
  });

  const { jobType, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.user && (
        <Fragment>
          {auth.user.isTrader ? (
            <div>
              {ticket.tickets.map((ticketi) => {
                return (
                  <div>
                    {ticketi.quotes.map((quotei) => {
                      if (
                        quotei.isAccepted === true &&
                        quotei.user === auth.user._id
                      ) {
                        return (
                          <QuoteDisplay
                            quotes={quotei}
                            ticket={ticketi}
                            auth={auth}
                          />
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            customerHomePage
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyTickets: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getMyTickets })(HomePage);
