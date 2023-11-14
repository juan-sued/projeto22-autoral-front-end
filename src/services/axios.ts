import axios from 'axios';

const LOCAL = 'http://localhost:4000'
const PROD  = 'https://gellato-backend-node.onrender.com'

const axiosI = axios.create({
  baseURL: LOCAL
});
const axiosBasic = axios.create({
  baseURL: 'http://'
});

export { axiosI, axiosBasic };
