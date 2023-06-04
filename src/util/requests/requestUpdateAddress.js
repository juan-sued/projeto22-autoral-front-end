import { axiosI } from '../../services/axios';

async function requestUpdateAddress(
  sucess,
  setStateButton,
  idAddress,
  updateDataAddress,
  setUpdateDataAddress
) {
  axiosI
    .patch(`/users/addresses/${idAddress}`, updateDataAddress)
    .then(({ data }) => {
      sucess();
    })
    .catch(err => {
      console.error(err);

      setStateButton('err');
      setUpdateDataAddress({
        street: '',
        neighborhood: '',
        number: '',
        state: '',
        cep: ''
      });
      setTimeout(() => {
        console.log('aqui');
        setStateButton(true);
      }, '3000');
    });
}

export default requestUpdateAddress;
