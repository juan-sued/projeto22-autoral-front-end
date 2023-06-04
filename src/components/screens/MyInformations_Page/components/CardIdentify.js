import { useState } from 'react';
import styled from 'styled-components';
import { returnDayFormated } from '../../../../util/format';
import requestUpdateUser from '../../../../util/requests/requestUpdateUser';
import ButtonSubmitHover from '../../../shared/ButtonSubmitHover';
import InputInfoField from '../../../shared/InputInfoField';

export default function CardIdentify({
  userAndAddressesInfo,
  id,
  requestKey,
  setRequestKey
}) {
  const [stateButton, setStateButton] = useState(true);
  const [editToggle, setEditToggle] = useState(false);

  const dayCreatedAt = returnDayFormated(userAndAddressesInfo.createdAt);
  const dayUpdatedAt = returnDayFormated(userAndAddressesInfo.updatedAt);

  const [updateDataUser, setUpdateDataUser] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  });

  const handleChangeText = e => {
    setUpdateDataUser({ ...updateDataUser, [e.target.name]: e.target.value });
  };

  const sucess = () => {
    setStateButton('sucess');
    setTimeout(() => {
      setStateButton(true);
    }, '3000');

    setRequestKey(!requestKey);

    //aparecer uma popup aqui
  };

  function updateUser(event) {
    event.preventDefault();
    setStateButton('loading');
    requestUpdateUser({ updateDataUser, setUpdateDataUser, sucess, setStateButton, id });
  }
  console.log(updateDataUser);
  return (
    <CardIdentifyStyle>
      <form onSubmit={updateUser}>
        <InputInfoField
          nameInput={'Nome: '}
          editToggle={editToggle}
          placeholder={userAndAddressesInfo.user.name}
          name={'name'}
          value={updateDataUser.name}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={'Email: '}
          editToggle={editToggle}
          placeholder={userAndAddressesInfo.user.email}
          name={'email'}
          value={updateDataUser.email}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={editToggle ? 'CPF: (apenas números)' : 'CPF: '}
          editToggle={editToggle}
          placeholder={
            userAndAddressesInfo.user.cpf
              ? userAndAddressesInfo.user.cpf
              : 'não cadastrado'
          }
          name={'cpf'}
          value={updateDataUser.cpf}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={'Telefone: '}
          editToggle={editToggle}
          placeholder={
            userAndAddressesInfo.user.phone
              ? userAndAddressesInfo.user.phone
              : 'não cadastrado'
          }
          name={'phone'}
          value={updateDataUser.phone}
          onChange={handleChangeText}
        />

        <section className="dateUpdate">
          <InputInfoField
            nameInput={'Criado em: '}
            editToggle={false}
            placeholder={dayCreatedAt}
            marginRight={'10px'}
          />
          <InputInfoField
            nameInput={'Atualizado em: '}
            editToggle={false}
            placeholder={dayUpdatedAt}
            marginRight={'10px'}
          />
        </section>
        <ButtonSubmitHover
          stateButton={stateButton}
          editToggle={editToggle}
          setEditToggle={setEditToggle}
        />
      </form>
    </CardIdentifyStyle>
  );
}

const CardIdentifyStyle = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 15px;
  section {
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
  }
`;
