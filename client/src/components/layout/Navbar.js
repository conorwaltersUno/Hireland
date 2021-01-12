import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { clearTickets } from '../../actions/ticket';

import PropTypes from 'prop-types';

export const Navbar = ({
  logout,
  clearTickets,
  auth: { isAuthenticated, loading },
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/tickets'>
          <i className='fa fa-ticket'></i>
          <span className='hide-sm'> Ticket</span>
        </Link>
      </li>
      <li>
        <Link to='/profile'>
          <i className='fas fa-user'></i>
          <span className='hide-sm'> Profile</span>
        </Link>
      </li>
      <li>
        <a
          onClick={() => {
            clearTickets();
            logout();
          }}
          href='#!'
        >
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <i className='fas fa-tools'></i> Hireland
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propType = {
  logout: PropTypes.func.isRequired,
  clearTickets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearTickets })(Navbar);
