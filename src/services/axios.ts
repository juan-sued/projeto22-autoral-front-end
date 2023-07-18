import axios from 'axios';

const axiosI = axios.create({
  baseURL: 'https://gellato-acaiteria.vercel.app'
});
const axiosBasic = axios.create({
  baseURL: 'http://'
});

export { axiosI, axiosBasic };
