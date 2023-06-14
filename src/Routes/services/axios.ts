import axios from 'axios';

const axiosI = axios.create({
  baseURL: 'http://localhost:4000'
});

const axiosBasic = axios.create({
  baseURL: 'https://'
});

const productsRouter = axios.create({
  baseURL: 'http://localhost:4000/products'
});
const ordersRouter = axios.create({
  baseURL: 'http://localhost:4000/orders'
});

export { axiosI, axiosBasic, productsRouter, ordersRouter };
