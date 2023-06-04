import { useState } from 'react';

import Loading from '../../shared/Loading';
import ButtonSubmit from '../../shared/ButtonSubmit';
import { ContainerFormClass, InputClass } from './styles';
import signUpRequest from './singUpRequest';
import { useNavigate } from 'react-router-dom';
//import components

export default function SignUpForm() {
  const navigate = useNavigate();

  const [signUpData, setSignUpdata] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  const [stateColorButton, setStateCollorButton] = useState('#ffffff');

  const [sucess, setSucess] = useState(false);

  const handleChangText = e => {
    if (e.target.name === 'confirmPassword') setInputConfirmPassword(e.target.value);

    setSignUpdata({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  function newRegister(event) {
    event.preventDefault();

    if (inputConfirmPassword !== signUpData.password) {
      setInputConfirmPassword('');
      setStateCollorButton('#e21a26');

      return;
    }

    signUpRequest({ signUpData, setStateCollorButton, setSucess });
    if (signUpRequest) navigate('/sign-in');
  }

  if (
    (stateColorButton === '#e21a27' && signUpData.email.length > 0) ||
    (stateColorButton === '#e21a26' && inputConfirmPassword.length > 0)
  ) {
    setStateCollorButton('#ffffff');
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
            <Loading height={20} width={20} />
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
