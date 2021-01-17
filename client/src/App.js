import React, { Fragment, useEffect } from 'react';

//Component imports
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Tickets from './components/tickets/Tickets';
import Profile from './components/profile/Profile';
import ProfileTicket from './components/profile/ProfileTicket.js';
import CreateTicket from './components/ticket-forms/CreateTicket';
import ProfileForm from './components/profile-forms/ProfileForm';
import EditTicket from './components/ticket-forms/EditTicket';
import PrivateRoute from './components/routing/PrivateRoute';
import TicketByID from './components/tickets/TicketByID';
import HomePage from '../src/components/layout/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//action imports
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/profile/' component={Profile} />
              <PrivateRoute exact path='/homepage/' component={HomePage} />
              <PrivateRoute exact path='/tickets' component={Tickets} />
              <PrivateRoute
                exact
                path='/profile/:id'
                component={ProfileTicket}
              />
              <PrivateRoute
                exact
                path='
                
                '
                component={CreateTicket}
              />
              <PrivateRoute
                exact
                path='/ticket/create/:jt/:l'
                component={CreateTicket}
              />

              <PrivateRoute exact path='/ticket/:id' component={TicketByID} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={ProfileForm}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={ProfileForm}
              />
              <PrivateRoute exact path='/edit-ticket' component={EditTicket} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
