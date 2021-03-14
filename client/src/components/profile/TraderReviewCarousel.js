import ReactCardCarousel from 'react-card-carousel';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import React from 'react';
import { Link } from 'react-router-dom';
import { clearProfile } from '../../actions/profile';
import Stars from 'react-stars-display';

const cardStyle = {
  position: 'relative',
  height: '200px',
  width: '25rem',
  paddingTop: '80px',
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

const imgStyle = {
  maxWidth: '100px',
  maxHeight: '100px',
  marginTop: '-65px',
};

export const TraderReviewCarousel = ({ profiles, loading }) => {
  // traderTotalReview holds the total rating of each trader
  let traderTotalReview;
  // traderArr holds the information needed to display on card-carousel
  let traderArr = [];
  // sortedTrader holds the traderObj in descending order
  let sortedTrader = [];
  // an object to hold trader information
  let traderObj = { name: '', avg: Number, id: '', avatar: '' };

  const sortTraders = () => {
    // To clear the array everytime this component is loaded
    traderArr.forEach = (e) => {
      traderArr.pop(e);
    };
    // To clear the array everytime this component is loaded
    sortedTrader.forEach = (e) => {
      sortedTrader.pop(e);
    };
    // Map through all the trader profiles
    profiles.map((profile) => {
      // reset the traderTotalReview to 0
      traderTotalReview = 0;
      // To prevent function runs before state is ready
      if (profile.user) {
        // Only extract rating from trader account with one or more review
        if (profile.user.isTrader && profile.review.length > 0) {
          profile.review.map((reviewi) => {
            return (traderTotalReview += parseInt(reviewi.score));
          });
          traderObj = {
            name: profile.user.name,
            avg: parseFloat(traderTotalReview / profile.review.length),
            id: profile.user._id,
            avatar: profile.user.avatar,
          };
          // Push the required information to traderArr
          traderArr.push(traderObj);
        }
      } else {
        return <div></div>;
      }
      return <div></div>;
    });
    // Select traders that have average rating of 3 or more.
    traderArr.map((trader) => {
      if (trader.avg >= 3) {
        sortedTrader.push(trader);
        sortedTrader.sort(function (a, b) {
          return b.avg - a.avg;
        });
      }
      return null;
    });
  };

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <div style={cardContainerStyle}>
      {sortTraders()}
      <ReactCardCarousel style={{ height: '75%' }}>
        {sortedTrader.length > 0 &&
          sortedTrader.map((traderii) => {
            // eslint-disable-next-line
            return (
              <div style={cardStyle}>
                <img
                  className='round-img my-1'
                  style={imgStyle}
                  src={traderii.avatar}
                  alt=''
                />
                <div style={nameStyle}>
                  <Link
                    to={`/profile/${traderii.id}`}
                    onClick={clearProfile}
                    style={nameStyle}
                  >
                    <a
                      href={`/profile/${traderii.id}`}
                      className='trader-carousel-name'
                    >
                      {traderii.name}
                    </a>
                  </Link>
                </div>
                <div style={nameStyle}>
                  Stars
                  <Stars stars={traderii.avg} size={20}></Stars>
                </div>
              </div>
            );
          })}
      </ReactCardCarousel>
    </div>
  );
};

TraderReviewCarousel.propTypes = {
  profiles: PropTypes.object.isRequired,
};
