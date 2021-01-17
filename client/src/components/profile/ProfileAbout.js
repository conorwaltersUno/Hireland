import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  getProfileMapLocation,
} from '../../actions/profile';
import Map from '../map/map';

const ProfileAbout = ({
  getCurrentProfile,
  getProfileMapLocation,
  profile: { bio, review, location, loading },
  auth: {
    user: { name },
  },
  longitude,
  latitude,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfileMapLocation(location);
    // eslint-disable-next-line
  }, []);

  const locationformap = {
    address: '5 Balfour Avenue',
    lat: latitude,
    lng: longitude,
    center: [latitude, longitude],
  };

  console.log(locationformap);

  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}
      <h2 className='text-primary'>Reviews</h2>
      <div className='skills'>
        {review.map((review, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check'>{review}</i>
          </div>
        ))}
      </div>
      <div className='line'></div>
      <h2 className='text-primary'>Map</h2>
      <div className='map-container'>
        {!loading && longitude && latitude && (
          <Map location={locationformap} zoomLevel={18} />
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileMapLocation: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  latitude: state.profile.latitude,
  longitude: state.profile.longitude,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfileMapLocation,
})(ProfileAbout);
