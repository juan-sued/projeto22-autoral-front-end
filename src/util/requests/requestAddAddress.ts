import { axiosI } from '../../services/axios';

interface CreateDataAddress {
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  city: string;
  cep: string;
  addressDetail: string;
}

function requestAddAddress(
  success: () => void,
  setStateButton: (value: '' | 'err' | 'loading' | 'success') => void,
  createDataAddress: CreateDataAddress,
  setCreateDataAddress: (value: CreateDataAddress) => void
): void {
  axiosI
    .post(`/users/addresses/`, createDataAddress)
    .then(({ data }) => {
      success();
    })
    .catch(err => {
      setStateButton('err');
      setCreateDataAddress({
        street: '',
        neighborhood: '',
        number: '',
        state: '',
        city: '',
        cep: '',
        addressDetail: ''
      });
      setTimeout(() => {
        setStateButton('');
      }, 3000);
    });
}

export default requestAddAddress;
