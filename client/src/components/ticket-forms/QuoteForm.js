import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quoteTicket } from '../../actions/ticket';

const QuoteForm = ({ quoteTicket, ticketId }) => {
  const [quote, setQuote] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    quoteTicket(ticketId, { quote });
    setQuote('');
  };

  return (
    <div>
      <div>
        <h3>Quote ticket</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='quote'
          cols='30'
          rows='5'
          placeholder='Quote ticket'
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />
        <input type='submit' value='submit' />
      </form>
    </div>
  );
};

QuoteForm.propTypes = {
  quoteTicket: PropTypes.func.isRequired,
};

export default connect(null, { quoteTicket })(QuoteForm);
