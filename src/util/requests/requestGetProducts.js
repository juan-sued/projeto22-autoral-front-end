import { axiosI } from '../../services/axios';

async function requestGetProducts(searchProduct, setResponseProducts) {
  axiosI
    .get(`/products/product?name=${searchProduct.searchBar}`)
    .then(({ data }) => {
      setResponseProducts(data);
    })
    .catch(err => {
      console.error(err);
      setResponseProducts([
        {
          image: 'https://soleneve.com.br/site/uploads/produtos_img/107/15493667925.png',
          name: 'Acaí com banana'
        }
      ]);
    });
}

export default requestGetProducts;
