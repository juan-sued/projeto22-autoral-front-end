import { axiosI } from '../../services/axios';

async function requestDeleteAddress(
  URL: string,
  requestKey: boolean,
  setRequestKey: (value: boolean) => void
) {
  axiosI
    .delete(URL)
    .then(({ data }) => {
      setRequestKey(!requestKey);
    })
    .catch(err => console.error(err));
}

export default requestDeleteAddress;
