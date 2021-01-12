import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileReview from './ProfileReview';
import { clearProfile } from '../../actions/profile';

import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

/*This class is used when a user clicks onto a profile from a ticket*/
const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
  clearProfile,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Fragment>
          <h1>There is no profile for this user</h1>
          <Link to='/create-profile' className='btn btn-primary'>
            Create a Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link to='/tickets' className='btn btn-white' onClick={clearProfile}>
            Back to tickets
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile}></ProfileTop>
            {auth.user.isTrader && (
              <div className='profile-exp bg-white pp-2'>
                <h2 className='text-primary'>Reviews</h2>
                {profile.review.length > 0 ? (
                  <Fragment>
                    {profile.review.map((review) => (
                      <ProfileReview key={review._id} review={review} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No review credentials</h4>
                )}
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, clearProfile })(
  Profile
);
