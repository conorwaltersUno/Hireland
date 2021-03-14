/* eslint react/prop-types: 0 */

import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyTickets } from '../../actions/ticket';
import { getCurrentProfile } from '../../actions/profile';
import TicketItem from './TicketItem';

const Ticket = ({
  getMyTickets,
  auth,
  ticket: { tickets, loading },
  profile,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getMyTickets();
  }, [getMyTickets]);

  function initialJobType() {
    return '';
  }

  const [filteredTicket, setFilter] = useState('');

  const [jobType, setJobType] = useState(initialJobType());

  const [traderTickets, setTraderTickets] = useState({
    displayText: 'Uncomplete tickets',
    toggle: false,
  });

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  const onDropChange = (e) => {
    e.preventDefault();
    setJobType(e.target.value);
  };

  const onClick = () => {
    console.log(traderTickets);
    if (traderTickets.toggle === false) {
      setTraderTickets({
        displayText: 'Completed tickets',
        toggle: true,
      });
    } else
      setTraderTickets({
        displayText: 'Uncomplete tickets',
        toggle: false,
      });
  };

  if (!auth.loading) {
    if (auth.user) {
      if (profile.profile === null && auth.user.isTrader) {
        return <Redirect to='/profile'></Redirect>;
      }
    } else {
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tickets</h1>
      <p className='lead'></p>
      {!auth.loading && !auth.user.isTrader && (
        <div>
          <Link to='/ticket/create' className='btn btn-primary'>
            Create a Ticket
          </Link>
          <button onClick={onClick} className='btn btn-primary'>
            {traderTickets.displayText}
          </button>
        </div>
      )}

      {!auth.loading && auth.user.isTrader && (
        <div className='search-container-tickets'>
          <select
            value={jobType}
            onChange={(e) => onDropChange(e)}
            className='drop-down-tickets'
          >
            <option value=''>* Filter on job type</option>
            <option value='Brick Laying'>Brick Laying</option>
            <option value='Carpentry'>Carpentry</option>
            <option value='Cleaning'>Cleaning</option>
            <option value='Electrical Installation'>
              Electrical Installation
            </option>
            <option value='Electrical Repair'>Electrical Repair</option>
            <option value='Flooring'>Flooring</option>
            <option value='Furnishing'>Furnishing</option>
            <option value='General Repairing'>General Repairing</option>
            <option value='Gardening'>Gardening</option>
            <option value='Painting'>Painting</option>
            <option value='Pest Control'>Pest Control</option>
            <option value='Plumbing'>Plumbing</option>
            <option value='Property extension'>Property extension</option>
            <option value='Renovating'>Renovating</option>
            <option value='Structural repair'>Structural repair</option>
            <option value='Windows, Doors and Conservatories'>
              Pest Control
            </option>
          </select>
          <input
            onChange={(e) => onChange(e)}
            placeholder='search by title'
            className='search-bar'
          />
        </div>
      )}

      {/* auth.loading and loading are there to prevent rendering happens before mapStateToProps. */}
      {/* all tickets.map() function used below code are refering to the tickets being hold in the state. */}
      {!auth.loading && auth.user.isTrader && !loading ? (
        //  jobType and filtertedTicket are state variables from react.useState().
        //  jobType holds the value which the user select from the dropdown menu.
        //  filteredTicket holds the value which the user enters in the searchBar.
        !jobType && !filteredTicket && tickets ? (
          <div className='tickets'>
            {/* display all tickets if logged in user is a trader. */}
            {tickets.map((ticketi) => (
              <div className='ticketitem-container'>
                {/* display only uncomplete tickets. */}
                {ticketi.isCompleteUser === false && (
                  <TicketItem ticket={ticketi} />
                )}
              </div>
            ))}
          </div>
        ) : // If jobType is not null, perform below actions.
        jobType ? (
          <div>
            {/* Map through all the tickets stored in state. */}
            {tickets.map((ticket) => {
              // If the ticket's jobType matches the user's input.
              if (ticket.jobType.includes(jobType)) {
                // If user types anything on the search bar.
                if (filteredTicket) {
                  // If the user input from the search bar match the ticket's title and is not completed.
                  if (
                    ticket.title
                      .toLowerCase()
                      .includes(filteredTicket.toLowerCase()) &&
                    ticket.isCompleteUser === false
                  ) {
                    return (
                      <div className='ticketitem-container'>
                        <TicketItem key={ticket._id} ticket={ticket} />
                      </div>
                    );
                  }
                  // If no input is given on the search bar, display uncompleted ticket that includes
                  // user defined jobType
                } else if (ticket.isCompleteUser === false) {
                  return (
                    <div className='ticketitem-container'>
                      <TicketItem key={ticket._id} ticket={ticket} />
                    </div>
                  );
                } else return <div> </div>;
              }
              return <div></div>;
            })}
          </div>
        ) : (
          //  If jobType is null, perform below actions
          <div>
            {tickets.map((ticket) => {
              // If ticket is uncomplete and matches the user input on search bar, perform below actions
              if (
                ticket.title
                  .toLowerCase()
                  .includes(filteredTicket.toLowerCase()) &&
                ticket.isCompleteUser === false
              ) {
                return (
                  <div className='ticketitem-container'>
                    <TicketItem key={ticket._id} ticket={ticket} />
                  </div>
                );
              }
              return <div></div>;
            })}
          </div>
        )
      ) : (
        // If logged in user is not a trader, perform below actions
        !auth.loading &&
        tickets.map((ticket) => {
          if (ticket.user === auth.user._id)
            if (
              ticket.isCompleteUser === false &&
              traderTickets.toggle === false
            ) {
              // default view is uncomplete ticket
              return <TicketItem key={ticket._id} ticket={ticket} />;
              // homeowenr can toggle traderTicket.toggle to view completed ticket
            } else if (
              ticket.isCompleteUser === true &&
              traderTickets.toggle === true
            ) {
              return (
                <div>
                  <TicketItem key={ticket._id} ticket={ticket} />
                </div>
              );
            }
          return <div></div>;
        })
      )}
    </Fragment>
  );
};

Ticket.propTypes = {
  getMyTickets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
  profile: state.profile,
});

export default connect(mapStateToProps, { getMyTickets, getCurrentProfile })(
  Ticket
);
