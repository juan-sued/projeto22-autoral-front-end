import { axiosI } from '../../services/axios';

interface ResponseAPI {
  // defina a estrutura completa do objeto ResponseAPI
}

function requestOfertDay(
  objResponseAPI: ResponseAPI,
  setObjResponseAPI: (value: ResponseAPI) => void,
  signOut: () => void
): void {
  axiosI
    .get('/ofert-day')
    .then(response => {
      if (response.status === 200) {
        setObjResponseAPI({ ...objResponseAPI, ofertOfDay: response.data });
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        signOut();
      }
      console.log(err);
    });
}

export default requestOfertDay;
