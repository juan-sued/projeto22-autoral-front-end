import React, { useState, ChangeEvent, FormEvent } from 'react';
import Loading from '../../shared/Loading';
import ButtonSubmit from '../../shared/ButtonSubmit';
import { useAuth } from '../../../hooks/useAuth';
import { ContainerFormClass, InputClass } from './styles';

interface SignInFormProps {
  // adicione as props necessárias aqui, se houver
}

const SignInForm: React.FC<SignInFormProps> = () => {
  const { signIn } = useAuth();

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [stateColorButton, setStateColorButton] = useState('#ffffff');

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault();
    signIn(signInData, setStateColorButton, setSignInData);
  };

  if (stateColorButton === '#e21a27' && signInData.email.length > 0) {
    setStateColorButton('#ffffff');
  }

  return (
    <ContainerFormClass>
      <form onSubmit={handleSignIn}>
        <InputClass
          placeholder="E-mail"
          type="email"
          name="email"
          value={signInData.email}
          onChange={handleChangeText}
          required
        />
        <InputClass
          placeholder="Senha"
          type="password"
          name="password"
          value={signInData.password}
          onChange={handleChangeText}
          required
        />
        <ButtonSubmit width={'303px'} backgroundcolor={stateColorButton}>
          {stateColorButton === '#e21a27' ? (
            'Email ou senha incorretas!'
          ) : stateColorButton === '#8a8893' ? (
            <Loading height={'20'} width={'20'} />
          ) : (
            'Entrar'
          )}
        </ButtonSubmit>
      </form>
    </ContainerFormClass>
  );
};

export default SignInForm;
