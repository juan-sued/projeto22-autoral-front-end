import { axiosI } from '../../services/axios';

interface ResponseAPI {
  // defina a estrutura completa do objeto ResponseAPI
}

function requestMoreOrders(
  objResponseAPI: ResponseAPI,
  setObjResponseAPI: (value: ResponseAPI) => void,
  signOut: () => void
): void {
  axiosI
    .get('/more-orders')
    .then(response => {
      if (response.status === 200) {
        setObjResponseAPI({ ...objResponseAPI, moreOrders: response.data });
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        signOut();
      }
      console.log(err);
    });
}

export default requestMoreOrders;
