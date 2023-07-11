import { UserAndAddressesInfo } from '@/components/screens/MyInformations_Page/MyInformation';
import { axiosI } from '@/services/axios';

interface UpdateDataUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface RequestUpdateUserProps {
  objFormated: Partial<UpdateDataUser>;
  success: () => void;
  setStateButton: (value: '' | 'err' | 'loading' | 'success') => void;
  id: number;
  setUpdateDataUser: (value: UpdateDataUser) => void;
}

async function requestUpdateUser({
  objFormated,
  success,
  setStateButton,
  id,
  setUpdateDataUser
}: RequestUpdateUserProps) {
  try {
    await axiosI.patch(`/users/`, objFormated);
    success();
  } catch (err) {
    console.error(err);
    setUpdateDataUser({
      name: '',
      email: '',
      cpf: '',
      phone: ''
    });
    setStateButton('err');
    setTimeout(() => {
      setStateButton('success');
    }, 3000);
  }
}

async function getUserAndAddresses(
  setUserAndAddressesInfo: (
    value: React.SetStateAction<UserAndAddressesInfo | null>
  ) => void,
  id: number | undefined
) {
  try {
    const { data } = await axiosI.get(`/users/${id}`);
    setUserAndAddressesInfo(data);
  } catch (err) {
    console.error(err);
  }
}

const userRequests = {
  requestUpdateUser,
  getUserAndAddresses
};

export default userRequests;
