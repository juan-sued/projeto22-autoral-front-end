import { axiosI } from '@/services/axios';

interface UpdateDataUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface RequestUpdateUserProps {
  updateDataUser: UpdateDataUser;
  success: () => void;
  setStateButton: (value: '' | 'err' | 'loading' | 'success') => void;
  id: number;
  setUpdateDataUser: (value: UpdateDataUser) => void;
}

async function requestUpdateUser({
  updateDataUser,
  success,
  setStateButton,
  id,
  setUpdateDataUser
}: RequestUpdateUserProps) {
  try {
    await axiosI.patch(`/users/`, updateDataUser);
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

const userRequests = {
  requestUpdateUser
};

export default userRequests;
