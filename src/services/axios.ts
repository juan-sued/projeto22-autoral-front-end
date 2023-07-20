import axios from 'axios';

const axiosI = axios.create({
  baseURL: 'https://gellato-backend-node.onrender.com'
});
const axiosBasic = axios.create({
  baseURL: 'http://'
});

export { axiosI, axiosBasic };
