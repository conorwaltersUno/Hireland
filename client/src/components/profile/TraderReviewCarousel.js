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
  let traderTotalReview;
  let traderArr = [];
  let sortedTrader = [];
  let traderObj = { name: '', avg: Number, id: '', avatar: '' };
  const sortTraders = () => {
    traderArr.forEach = (e) => {
      traderArr.pop(e);
    };
    sortedTrader.forEach = (e) => {
      sortedTrader.pop(e);
    };

    profiles.map((profile) => {
      traderTotalReview = 0;
      if (profile.user.isTrader && profile.review.length > 0) {
        profile.review.map((reviewi) => {
          traderTotalReview += parseInt(reviewi.score);
        });
        traderObj = {
          name: profile.user.name,
          avg: parseFloat(traderTotalReview / profile.review.length),
          id: profile.user._id,
          avatar: profile.user.avatar,
        };
        traderArr.push(traderObj);
      }
    });
    traderArr.map((trader) => {
      if (trader.avg >= 4) {
        sortedTrader.push(trader);
        sortedTrader.sort(function (a, b) {
          return b.avg - a.avg;
        });
      }
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
                    <a className='trader-carousel-name'>{traderii.name}</a>
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
