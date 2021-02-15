import React from 'react';
import Moment from 'react-moment';

const TicketDisplay = ({
  ticket: { title, description, completionDate, photo },
}) => {
  return (
    <div>
      {title}
      <div>{description}</div>
      <img src={photo}></img>
      <div>
        Complete by <Moment format='DD/MM/YYYY'>{completionDate}</Moment>{' '}
      </div>
    </div>
  );
};

export default TicketDisplay;
