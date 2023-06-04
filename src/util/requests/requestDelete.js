import { axiosI } from '../../services/axios';

async function requestDeleteAddress(URL, requestKey, setRequestKey) {
  axiosI
    .delete(URL)
    .then(({ data }) => {
      setRequestKey(!requestKey);
    })
    .catch(err => console.error(err));
}

export default requestDeleteAddress;
