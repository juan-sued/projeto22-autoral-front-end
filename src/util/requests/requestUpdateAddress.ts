import { axiosI } from '../../services/axios';

interface UpdateDataAddress {
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  cep: string;
}

interface RequestUpdateAddressProps {
  success: () => void;
  setStateButton: (value: boolean | 'err') => void;
  idAddress: string;
  updateDataAddress: UpdateDataAddress;
  setUpdateDataAddress: (value: UpdateDataAddress) => void;
}

async function requestUpdateAddress({
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
    }, 3000);
  }
}

export default requestUpdateAddress;
