import { useState, ChangeEvent, FormEvent } from 'react';
import Loading from '@/components/shared/Loaders/Loading';
import { ContainerFormClass, InputClass } from './styles';
import signUpRequest from './singUpRequest';
import ButtonSubmit from '@/components/shared/Buttons/ButtonSubmit';
import { useNavigate } from 'react-router-dom';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  const [stateColorButton, setStateColorButton] = useState('#ffffff');

  const handleChangText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'confirmPassword')
      setInputConfirmPassword(e.target.value);

    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };
  function sucess() {
    navigate('/sign-in');
  }

  function newRegister(event: FormEvent) {
    event.preventDefault();
    if (inputConfirmPassword !== signUpData.password) {
      setInputConfirmPassword('');
      setStateColorButton('#e21a26');
      return;
    }

    signUpRequest({ signUpData, setStateColorButton, sucess });
  }

  if (
    (stateColorButton === '#e21a27' && signUpData.email.length > 0) ||
    (stateColorButton === '#e21a26' && inputConfirmPassword.length > 0)
  ) {
    setStateColorButton('#ffffff');
  }

  return (
    <ContainerFormClass>
      <form onSubmit={newRegister}>
        <InputClass
          placeholder="Nome"
          name="name"
          type="text"
          value={signUpData.name}
          onChange={handleChangText}
          required
        />
        <InputClass
          placeholder="E-mail"
          name="email"
          type="email"
          value={signUpData.email}
          onChange={handleChangText}
          required
        />
        <InputClass
          placeholder="Senha"
          name="password"
          type="password"
          value={signUpData.password}
          onChange={handleChangText}
          required
        />
        <InputClass
          placeholder="Confirme a senha"
          name="confirmPassword"
          type="password"
          value={inputConfirmPassword}
          onChange={handleChangText}
          required
        />
        <ButtonSubmit width={'303px'} backgroundcolor={stateColorButton}>
          {stateColorButton === '#e21a27' ? (
            'Usuário já cadastrado!'
          ) : stateColorButton === '#8a8893' ? (
            <Loading height={'20'} width={'20'} />
          ) : stateColorButton === '#e21a26' ? (
            'Senhas diferentes'
          ) : (
            'Cadastrar'
          )}
        </ButtonSubmit>
      </form>
    </ContainerFormClass>
  );
}
