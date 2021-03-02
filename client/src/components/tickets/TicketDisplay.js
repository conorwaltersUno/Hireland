import React, { useEffect } from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import { connect } from 'react-redux';
import { clearProfile } from '../../actions/profile';

import { getTicketMapLocation } from '../../actions/profile';
import Map from '../map/map';
import Spinner from '../layout/Spinner';

const TicketDisplay = ({
  clearProfile,
  ticket: {
    title,
    description,
    completionDate,
    avatar,
    jobType,
    longitude,
    latitude,
    loading,
    location,
    user,
  },
  getTicketMapLocation,
}) => {
  useEffect(() => {
    if (location) {
      getTicketMapLocation(location);
    }

    // eslint-disable-next-line
  }, [latitude, longitude, location]);

  const locationformap = {
    address: '',
    lat: latitude,
    lng: longitude,
    center: [latitude, longitude],
  };

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className='bg-primary p-2' style={{ height: '275px' }}>
        <div className='text-ticket-page'>
          <div style={{ width: '100%' }}>
            <h1>{title}</h1>
            <h2>{jobType}</h2>
            <div className='line'></div>
            <div>{description}</div>
            <div className='line'></div>
            <div>
              Complete by <Moment format='DD/MM/YYYY'>{completionDate}</Moment>{' '}
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginRight: '800px', maxWidth: '300px' }}>
            <Link to={`/profile/${user}`} onClick={clearProfile}>
              {avatar ? (
                <Fragment>
                  <img className='round-img-left' src={avatar} />
                </Fragment>
              ) : (
                <div>There is no avatar</div>
              )}
            </Link>
            <div></div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            background: 'var(--light-color)',
            color: '#333',
            padding: '2rem',
            height: '50%',
            width: '50%',
            float: 'left',
          }}
        >
          <h2 className='text-primary' style={{ textAlign: 'center' }}>
            Map
          </h2>
          <div className='map-container'>
            {longitude && latitude && locationformap ? (
              <Map location={locationformap} zoomLevel={15} />
            ) : (
              <div>
                Your postcode cannot be found on google maps
                <div>Please update your ticket to the correct postcode</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TicketDisplay.propTypes = {
  getTicketMapLocation: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  latitude: state.ticket.ticket.latitude,
  longitude: state.ticket.ticket.longitude,
});

export default connect(mapStateToProps, {
  getTicketMapLocation,
  clearProfile,
})(TicketDisplay);
