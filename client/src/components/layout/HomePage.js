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
  }, [getMyTickets, getallProfiles, getCurrentProfile]);

  const [formData, setFormData] = useState({
    jobType: 'Please select your job type',
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
              <div className='form-text-jobtype-dropdown'>
                <select
                  name='jobType'
                  value={jobType}
                  onChange={(e) => onChange(e)}
                >
                  <option value=''>* Please select your job type</option>
                  <option value='Brick Laying'>Brick Laying</option>

                  <option value='Carpentry'>Carpentry</option>
                  <option value='Cleaning'>Cleaning</option>
                  <option value='Electrical Installation'>
                    Electrical Installation
                  </option>
                  <option value='Electrical Repair'>Electrical Repair</option>
                  <option value='Flooring'>Flooring</option>
                  <option value='Furnishing'>Furnishing</option>
                  <option value='General Repairing'>General Repairing</option>
                  <option value='Gardening'>Gardening</option>
                  <option value='Painting'>Painting</option>
                  <option value='Pest Control'>Pest Control</option>
                  <option value='Plumbing'>Plumbing</option>
                  <option value='Property extension'>Property extension</option>
                  <option value='Renovating'>Renovating</option>
                  <option value='Structural repair'>Structural repair</option>
                  <option value='Windows, Doors and Conservatories'>
                    Pest Control
                  </option>
                </select>
              </div>

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
              <h2>Past Tickets</h2>
              {ticket.tickets.map((ticketi) => {
                return (
                  <div>
                    {/* eslint-disable-next-line */}
                    {ticketi.quotes.map((quotei) => {
                      if (
                        quotei.isAccepted === true &&
                        quotei.user === auth.user._id &&
                        ticketi.isCompleteUser === true
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
