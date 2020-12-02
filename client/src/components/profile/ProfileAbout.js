import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    review,
    user: { name },
  },
}) => {
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
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
