import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import { clearProfile } from '../../actions/profile';

import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';

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
      {profile === null ? (
        <Fragment>
          <h1>There is no profile for this user </h1>
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
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile} auth={auth}></ProfileAbout>
            {auth.user.isTrader && (
              <div className='profile-exp bg-white pp-2'>
                {profile.review.length != 0 && (
                  <Fragment>
                    <h2 className='text-primary'>Reviews</h2>
                    {profile.review && (
                      <div>
                        {profile.review.map((reviewi) => {
                          return (
                            <div>
                              {reviewi.description}
                              <div>{reviewi.score}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Fragment>
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
