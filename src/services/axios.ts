import axios from 'axios';

const axiosI = axios.create({
  baseURL: 'http://localhost:4000'
});

const axiosBasic = axios.create({
  baseURL: 'https://'
});

const axiosHttpCats = axios.create({
  baseURL: 'https://http.cat/'
});

export { axiosI, axiosBasic, axiosHttpCats };
