import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { returnDayFormated } from '../../../../util/format';
import requestUpdateUser from '../../../../util/requests/requestUpdateUser';
import ButtonSubmitHover from '../../../shared/ButtonSubmitHover';
import InputInfoField from '../../../shared/InputInfoField';
import { User } from '../../../../hooks/useAuth';

export interface UserDetails extends User {
  cpf: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateDataUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface CardIdentifyProps {
  userDetails: UserDetails;
  id: number;
  requestKey: boolean;
  setRequestKey: (value: boolean) => void;
}

export default function CardIdentify({
  userDetails,
  id,
  requestKey,
  setRequestKey
}: CardIdentifyProps) {
  const [stateButton, setStateButton] = useState<
    '' | 'err' | 'loading' | 'sucess'
  >('');
  const [editToggle, setEditToggle] = useState(false);

  const dayCreatedAt = returnDayFormated(userDetails.createdAt);
  const dayUpdatedAt = returnDayFormated(userDetails.updatedAt);

  const [updateDataUser, setUpdateDataUser] = useState<UpdateDataUser>({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  });

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateDataUser({ ...updateDataUser, [e.target.name]: e.target.value });
  };

  const success = () => {
    setStateButton('sucess');
    setTimeout(() => {
      setStateButton('');
    }, 3000);

    setRequestKey(!requestKey);

    //aparecer uma popup aqui
  };

  function updateUser(event: FormEvent) {
    event.preventDefault();
    setStateButton('loading');
    requestUpdateUser({
      updateDataUser,
      setUpdateDataUser,
      success,
      setStateButton,
      id
    });
  }
  return (
    <CardIdentifyStyle>
      <form onSubmit={updateUser}>
        <InputInfoField
          nameInput={'Nome: '}
          editToggle={editToggle}
          placeholder={userDetails.name}
          name={'name'}
          value={updateDataUser.name}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={'Email: '}
          editToggle={editToggle}
          placeholder={userDetails.email}
          name={'email'}
          value={updateDataUser.email}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={editToggle ? 'CPF: (apenas números)' : 'CPF: '}
          editToggle={editToggle}
          placeholder={userDetails.cpf ? userDetails.cpf : 'não cadastrado'}
          name={'cpf'}
          value={updateDataUser.cpf}
          onChange={handleChangeText}
        />
        <InputInfoField
          nameInput={'Telefone: '}
          editToggle={editToggle}
          placeholder={userDetails.phone ? userDetails.phone : 'não cadastrado'}
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
}
`;
