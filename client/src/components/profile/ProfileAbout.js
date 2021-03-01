import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  getProfileMapLocation,
} from '../../actions/profile';
import Map from '../map/map';
import Spinner from '../layout/Spinner';
import ReactCardCarousel from 'react-card-carousel';
import Stars from 'react-stars-display';

const cardStyle = {
  position: 'relative',
  height: '200px',
  width: '25rem',
  paddingTop: '60px',
  textAlign: 'center',
  background: '#3aafa9',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  textTransform: 'uppercase',
  borderRadius: '10px',
  boxSizing: 'border-box',
};

const nameStyle = {
  color: '#ffffff',
  maxwidth: '20vh',
  overflowWrap: 'break-word',
};

const cardContainerStyle = {
  position: 'relative',
  height: '30vh',
  width: '100%',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'middle',
};

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
              <p style={{ overflowWrap: 'break-word' }}>{bio}</p>
              <div className='line'></div>
            </div>
          )}
        </Fragment>
      )}
      {review.length !== 0 && (
        <Fragment>
          <h2 className='text-primary'>Reviews</h2>
          {review && (
            <div style={cardContainerStyle}>
              <ReactCardCarousel style={{ height: '75%' }}>
                {review.map((reviewi) => {
                  return (
                    <div style={cardStyle}>
                      <div style={nameStyle}>
                        <div>User Name:</div>
                        <div style={{ color: '97a7a7' }}>
                          {reviewi.username}
                        </div>
                        <div>Description:</div>
                        <div style={{ color: '97a7a7' }}>
                          {reviewi.description}
                        </div>
                      </div>
                      <div>Review Rating:</div>
                      <div style={nameStyle}>
                        <Stars stars={reviewi.score} size={20}></Stars>
                      </div>
                    </div>
                  );
                })}
              </ReactCardCarousel>
            </div>
          )}
          <div className='line'></div>
        </Fragment>
      )}

      <h2 className='text-primary'>Map</h2>
      <div className='map-container'>
        {!loading && longitude && latitude ? (
          <Map location={locationformap} zoomLevel={15} />
        ) : (
          <div>
            Your postcode cannot be found on google maps
            <div>Please update your profile to the correct postcode</div>
          </div>
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
