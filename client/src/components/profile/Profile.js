import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getCurrentProfile, clearProfile } from '../../actions/profile';

import { Link } from 'react-router-dom';

const Profile = ({
  getCurrentProfile,
  clearProfile,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return profile == null ? (
    <Fragment>
      {auth.loading === false && auth.user.isTrader ? (
        <h1>As a trader, it is necessary to have a profile</h1>
      ) : (
        <h1>There is no profile for this user</h1>
      )}
      <Link to='/create-profile' className='btn btn-primary'>
        Create a Profile
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <Link to='/tickets' className='btn btn-white'>
        Back to tickets
      </Link>

      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      <div className='profile-grid my-1'>
        {!loading && (
          <Fragment>
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile} auth={auth}></ProfileAbout>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  clearProfile,
})(Profile);
