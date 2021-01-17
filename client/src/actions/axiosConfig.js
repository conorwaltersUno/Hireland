// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://api.postcodes.io/postcodes/',
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Also add/ configure interceptors && all the other cool stuff

export default instance;
