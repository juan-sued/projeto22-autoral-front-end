import { UpdateDataAddress } from '@/components/screens/MyInformations_Page/components/CardAddress';
import { axiosI } from '@/Routes/services/axios';

interface CreateDataAddress {
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  city: string;
  cep: string;
  addressDetail: string;
}

function postAddresses(
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

import { axiosBasic } from '@/Routes/services/axios';
import { formatCEP } from '@brazilian-utils/brazilian-utils';

function getCep(
  createDataAddress: CreateDataAddress,
  setCreateDataAddress: (value: CreateDataAddress) => void,
  setStateButton: (value: '' | 'err' | 'loading' | 'success') => void
): void {
  axiosBasic
    .get(`viacep.com.br/ws/${createDataAddress.cep}/json/`)
    .then(({ data }) => {
      const cepFormated = formatCEP(data.cep);

      setCreateDataAddress({
        street: data.logradouro,
        neighborhood: data.bairro,
        number: '',
        state: data.uf,
        city: data.localidade,
        cep: cepFormated,
        addressDetail: data.complemento
      });
    })
    .catch(err => {
      console.log(err);
      setCreateDataAddress({
        street: '',
        neighborhood: '',
        number: '',
        state: '',
        city: '',
        cep: '',
        addressDetail: ''
      });
    });
}

async function deleteAddress(
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

interface RequestUpdateAddressProps {
  success: () => void;
  setStateButton: (value: '' | 'err' | 'loading') => void;
  idAddress: string;
  updateDataAddress: UpdateDataAddress;
  setUpdateDataAddress: (value: UpdateDataAddress) => void;
}

async function updateAddress({
  success,
  setStateButton,
  idAddress,
  updateDataAddress,
  setUpdateDataAddress
}: RequestUpdateAddressProps) {
  try {
    await axiosI.patch(`/users/addresses/${idAddress}`, updateDataAddress);
    success();
  } catch (err) {
    setStateButton('err');
    setUpdateDataAddress({
      street: '',
      neighborhood: '',
      number: '',
      state: '',
      cep: '',
      addressDetail: '',
      city: ''
    });
    setTimeout(() => {
      setStateButton('');
    }, 3000);
  }
}

const addressesRequests = {
  getCep,
  postAddresses,
  deleteAddress,
  updateAddress
};

export default addressesRequests;
