import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quoteTicket } from '../../actions/ticket';
// import { getTicketCreatorInfo } from '../../actions/ticket';
import emailjs from 'emailjs-com';

const QuoteForm = ({
  quoteTicket,
  ticketId,
  userId,
  // getTicketCreatorInfo,
  ticket: { ticket },
  auth,
}) => {
  const [quote, setQuote] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    quoteTicket(ticketId, { quote });
    emailjs.send(
      'service_er09efl',
      'template_10bw78j',
      {
        from_name: auth.user.name,
        to_name: ticket.ticketOwner.name,
        message: quote,
        to_email: ticket.ticketOwner.email,
        //to_email: 'jialianglee98@gmail.com',
        reply_to: ticket.title,
      },
      'user_0BKx8SUrYQ0Ldp57gHVyV'
    );
    setQuote('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>
        <h3>Quote this ticket</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='number'
          name='quote'
          cols='30'
          rows='5'
          placeholder='Price to complete job'
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
  // getTicketCreatorInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  auth: state.auth,
});

export default connect(mapStateToProps, { quoteTicket })(QuoteForm);
