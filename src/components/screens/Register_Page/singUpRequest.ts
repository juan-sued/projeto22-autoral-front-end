import { axiosI } from '@/services/axios';
import { SignUpData } from './InputsRegister';

interface SignUpRequestProps {
  signUpData: SignUpData;
  setStateColorButton: React.Dispatch<React.SetStateAction<string>>;
  sucess: () => void;
}

async function SignUpRequest({
  signUpData,
  setStateColorButton,
  sucess
}: SignUpRequestProps) {
  setStateColorButton('#8a8893');
  try {
    await axiosI.post('/auth/sign-up', signUpData);
    sucess();
  } catch (err) {
    setStateColorButton('#e21a27');
  }
}

export default SignUpRequest;
