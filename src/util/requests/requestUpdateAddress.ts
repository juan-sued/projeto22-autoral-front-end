import { UpdateDataAddress } from '../../components/screens/MyInformations_Page/components/CardAddress';
import { axiosI } from '../../services/axios';

interface RequestUpdateAddressProps {
  success: () => void;
  setStateButton: (value: '' | 'err' | 'loading') => void;
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

export default requestUpdateAddress;
