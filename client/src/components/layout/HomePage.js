import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Link, Redirect } from 'react-router-dom';
import { getallProfiles, getCurrentProfile } from '../../actions/profile';
import { getMyTickets } from '../../actions/ticket';
import TicketItem from '../tickets/TicketItem';
import { TraderReviewCarousel } from '../profile/TraderReviewCarousel';

const HomePage = ({
  getMyTickets,
  getallProfiles,
  getCurrentProfile,
  auth,
  profiles,
  profile,
  ticket,
}) => {
  useEffect(() => {
    getMyTickets();
    getallProfiles();
    getCurrentProfile();
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

  if (auth.user) {
    if (profile.profile === null && auth.user.isTrader) {
      return <Redirect to='/profile'></Redirect>;
    }
  }

  const urllink =
    '/ticket/create/' + formData.jobType + '/' + formData.location;

  const customerHomePage = (
    <Fragment>
      <div>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <h1>Welcome to Hireland</h1>
            <h3 className='customer-lighter-text-title'>
              A faster way to get your jobs complete
            </h3>
            <div className='customer-input-container'>
              <input
                className='customer-input'
                type='text'
                name='jobType'
                value={jobType}
                onChange={(e) => onChange(e)}
                placeholder='What Job do you want to be completed?'
              ></input>

              <input
                className='customer-location'
                type='text'
                name='location'
                value={location}
                placeholder='Postcode'
                onChange={(e) => onChange(e)}
              ></input>
              <div className='submit-button-customer'>
                {formData.location !== '' && <Link to={urllink}>Submit</Link>}
              </div>
            </div>
          </div>
          <div>
            <h2 className='best-reviewed-trader-title'>
              Meet our best reviewed traders!
            </h2>
          </div>
          {profile.loading ? (
            <Spinner />
          ) : (
            <TraderReviewCarousel
              profiles={profiles}
              loading={profile.loading}
            ></TraderReviewCarousel>
          )}
        </form>
      </div>
    </Fragment>
  );

  return auth.loading && profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.user && (
        <Fragment>
          {auth.user.isTrader ? (
            <div>
              <h2>Active Tickets</h2>
              {ticket.tickets.map((ticketi) => {
                return (
                  <div>
                    {/* eslint-disable-next-line */}
                    {ticketi.quotes.map((quotei) => {
                      if (
                        quotei.isAccepted === true &&
                        quotei.user === auth.user._id &&
                        ticketi.isCompleteUser === false
                      ) {
                        return (
                          <Fragment>
                            <TicketItem key={ticketi._id} ticket={ticketi} />
                          </Fragment>
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
  getallProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
  profiles: state.profile.profiles,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getMyTickets,
  getallProfiles,
  getCurrentProfile,
})(HomePage);
