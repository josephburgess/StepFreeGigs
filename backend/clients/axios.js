const Axios = require('axios');
const axiosCache = require('axios-cache-interceptor');

let axios = Axios;

if (process.env.NODE_ENV == 'development'){
  // setup cache if in dev mode
  axios = axiosCache.setupCache(Axios);
}

module.exports = axios
