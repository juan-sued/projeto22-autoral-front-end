import { axiosI } from '../../../services/axios';

async function SignUpRequest({ signUpData, setStateCollorButton, setSucess }) {
  setStateCollorButton('#8a8893');
  try {
    await axiosI.post('auth/sign-up', signUpData);
    return true;
  } catch (err) {
    setStateCollorButton('#e21a27');
  }
}

export default SignUpRequest;
