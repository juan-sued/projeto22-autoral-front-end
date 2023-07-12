import { useState } from 'react';
import styled from 'styled-components';
import iconremoveblack from '@/assets/iconremoveblack.svg';

import { returnDayFormated } from '@/util/format';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import addressesRequests from '@/util/requests/users/addresses/addressesRequests';
import ButtonSubmitHover from '@/components/shared/Buttons/ButtonSubmitHover';
import InputInfoField from '@/components/shared/Inputs/InputInfoField';

interface CardAddressProps {
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  cep: string;
  createdAt: string;
  updatedAt: string;
  idAddress: string;
  requestKey: boolean;
  setRequestKey: (value: boolean) => void;
  city: string;
}

export interface UpdateDataAddress {
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  cep: string;
  addressDetail: string;
  city: string;
}

export default function CardAddress({
  street,
  number,
  neighborhood,
  state,
  cep,
  createdAt,
  updatedAt,
  idAddress,
  requestKey,
  setRequestKey,
  city
}: CardAddressProps) {
  const [stateButton, setStateButton] = useState<
    '' | 'err' | 'loading' | 'success'
  >('');
  const [editToggle, setEditToggle] = useState<boolean>(false);

  const dayCreatedAt = returnDayFormated(createdAt);
  const dayUpdatedAt = returnDayFormated(updatedAt);

  const [cardHeightToggle, setCardHeightToggle] = useState<boolean>(true);

  const [updateDataAddress, setUpdateDataAddress] = useState<UpdateDataAddress>(
    {
      street: '',
      neighborhood: '',
      number: '',
      state: '',
      cep: '',
      addressDetail: '',
      city: ''
    }
  );

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateDataAddress({
      ...updateDataAddress,
      [e.target.name]: e.target.value
    });
  };

  const success = () => {
    setRequestKey(!requestKey);
    setStateButton('success');
  };

  function updateAddress(event: React.FormEvent) {
    event.preventDefault();
    setStateButton('loading');
    addressesRequests.updateAddress({
      success,
      setStateButton,
      idAddress,
      updateDataAddress,
      setUpdateDataAddress
    });
  }

  function deleteAddress() {
    const URL = `/users/addresses/${idAddress}`;
    addressesRequests.deleteAddress(URL, requestKey, setRequestKey);
  }
  return (
    <Container>
      <CardAddressStyle cardHeightToggle={cardHeightToggle}>
        <form onSubmit={updateAddress}>
          <section className="street">
            <InputInfoField
              nameInput={'Rua: '}
              editToggle={editToggle}
              placeholder={street}
              name={'street'}
              value={updateDataAddress.street}
              onChange={handleChangeText}
            />
            <button className="remove" type="button" onClick={deleteAddress}>
              <img src={iconremoveblack} alt="" />
            </button>
            <button
              className="iconToggle"
              type="button"
              onClick={() => setCardHeightToggle(!cardHeightToggle)}
            >
              {!cardHeightToggle ? (
                <MdExpandLess color="purple" size="35px" />
              ) : (
                <MdExpandMore size="35px" color="purple" />
              )}
            </button>
          </section>

          <section className="neighborhoodAndNumber">
            <InputInfoField
              nameInput={'Bairro: '}
              editToggle={editToggle}
              placeholder={neighborhood}
              marginRight={'10px'}
              name={'neighborhood'}
              value={updateDataAddress.neighborhood}
              onChange={handleChangeText}
            />
            <InputInfoField
              nameInput={'Número: '}
              editToggle={editToggle}
              placeholder={number}
              name={'number'}
              value={updateDataAddress.number}
              onChange={handleChangeText}
            />
          </section>
          <InputInfoField
            nameInput={'Cidade: '}
            editToggle={editToggle}
            placeholder={`${city}, ${state}`}
            name={'city'}
            value={updateDataAddress.city}
            onChange={handleChangeText}
          />
          <section className="cepAndState">
            <InputInfoField
              nameInput={'Estado: '}
              editToggle={editToggle}
              placeholder={state}
              marginRight={'10px'}
              name={'state'}
              value={updateDataAddress.state}
              onChange={handleChangeText}
            />
            <InputInfoField
              nameInput={'CEP: '}
              editToggle={editToggle}
              placeholder={cep}
              name={'cep'}
              value={updateDataAddress.cep}
              onChange={handleChangeText}
            />
          </section>

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
            nameButton="EDITAR"
          />
        </form>
      </CardAddressStyle>
    </Container>
  );
}

const CardAddressStyle = styled.div<{ cardHeightToggle: boolean }>`
  margin-top: 20px;
  background-color: white;
  width: 100%;

  border-radius: 10px;
  padding: 15px;
  overflow-y: hidden;
  padding-top: 20px;
  height: ${props => (props.cardHeightToggle ? '82px' : '487px')};
  transition: all 0.5s ease-out;

  section {
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
  }

  .remove {
    left: 40px;
    top: 50px;
    position: relative;

    img {
      width: 25px;
      height: 25px;
    }

    border: none;
    background-color: transparent;

    @media screen and (min-width: 413px) {
      top: 320px;
      left: 35px;
      img {
        width: 40px;
        height: 40px;
      }
      :hover {
        img {
          width: 60px;
          height: 60px;
        }
        left: 44px;
      }
    }
  }

  .iconToggle {
    position: relative;
    bottom: 30px;
    border: none;
    background-color: transparent;
  }
`;

const Container = styled.div`
  margin-top: 10px;
`;
