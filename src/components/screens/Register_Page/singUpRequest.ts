import { useNavigate } from 'react-router-dom';
import { axiosI } from '@/Routes/services/axios';
import { SignUpData } from './InputsRegister';

interface SignUpRequestProps {
  signUpData: SignUpData;
  setStateColorButton: React.Dispatch<React.SetStateAction<string>>;
}

async function SignUpRequest({
  signUpData,
  setStateColorButton
}: SignUpRequestProps) {
  const navigate = useNavigate();

  setStateColorButton('#8a8893');
  try {
    await axiosI.post('auth/sign-up', signUpData);
    navigate('/sign-in');
  } catch (err) {
    setStateColorButton('#e21a27');
  }
}

export default SignUpRequest;
