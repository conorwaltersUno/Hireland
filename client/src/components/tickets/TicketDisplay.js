import React from 'react';
import Moment from 'react-moment';

const TicketDisplay = ({ ticket: { title, description, completionDate } }) => {
  return (
    <div>
      {title}
      <div>{description}</div>
      <div>
        Complete by <Moment format='DD/MM/YYYY'>{completionDate}</Moment>{' '}
      </div>
    </div>
  );
};

export default TicketDisplay;
