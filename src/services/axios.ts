import axios from 'axios';

const axiosI = axios.create({
  baseURL: 'http://localhost:4000/'
});
const axiosBasic = axios.create({
  baseURL: 'http://'
});

export { axiosI, axiosBasic };
