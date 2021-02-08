import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  getProfileMapLocation,
} from '../../actions/profile';
import Map from '../map/map';
import Spinner from '../layout/Spinner';

const ProfileAbout = ({
  getCurrentProfile,
  getProfileMapLocation,
  profile: { bio, review, location, loading },
  auth: { user },
  longitude,
  latitude,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfileMapLocation(location);
    // eslint-disable-next-line
  }, []);

  const locationformap = {
    address: '',
    lat: latitude,
    lng: longitude,
    center: [latitude, longitude],
  };

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          {user && (
            <div>
              <h2 className='text-primary'>
                {user.name.trim().split(' ')[0]}'s Bio
              </h2>
              <p>{bio}</p>
              <div className='line'></div>
            </div>
          )}
        </Fragment>
      )}
      {review.length !== 0 && (
        <Fragment>
          <h2 className='text-primary'>Reviews</h2>
          {review && (
            <div>
              {review.map((reviewi) => {
                return (
                  <div>
                    {reviewi.description}
                    <div>{reviewi.score}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className='line'></div>
        </Fragment>
      )}

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
  review: state.profile.profile.review,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfileMapLocation,
})(ProfileAbout);
