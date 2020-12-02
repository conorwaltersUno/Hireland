import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { a } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  const urlToRender = (link) => {
    if (!link.match(/^[a-zA-Z]+:\/\//)) {
      return '//' + link;
    }
    return link;
  };
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a
            href={urlToRender(website)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a
            href={urlToRender(social.twitter)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}

        {social && social.facebook && (
          <a
            href={urlToRender(social.facebook)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}

        {social && social.linkedin && (
          <a
            href={urlToRender(social.linkedin)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}

        {social && social.youtube && (
          <a
            href={urlToRender(social.youtube)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}

        {social && social.instagram && (
          <a
            href={urlToRender(social.instagram)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
