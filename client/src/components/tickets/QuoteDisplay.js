import React from 'react';

const QuoteDisplay = ({ quotes: { name, user, quote } }) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <h2>Trader's name:</h2>
      {name}
      <h2>Quoted price</h2>
      <div>{quote}</div>
    </div>
  );
};

export default QuoteDisplay;
