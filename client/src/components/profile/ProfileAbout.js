import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Map from '../map/map';

const ProfileAbout = ({
  getCurrentProfile,
  profile: { bio, review },
  auth: {
    user: { name },
  },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  const location = {
    address: '5 Balfour Avenue',
    lat: 54.584571,
    lng: -5.921098,
    center: [54.584571, -5.921098],
  };

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
        <Map location={location} zoomLevel={18} />
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentProfile })(ProfileAbout);
