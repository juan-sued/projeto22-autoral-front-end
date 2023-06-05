import { useState } from 'react';
import styled from 'styled-components';
import InputInfoField from '../../../shared/InputInfoField';
import iconsearch from '../../../../assets/iconsearch.svg';
import ButtonSubmitHover from '../../../shared/ButtonSubmitHover';
import requestAddAddress from '../../../../util/requests/requestAddAddress';
import requestCep from '../../../../util/requests/requestCep';

interface CardAddAddressProps {
  requestKey: boolean;
  setRequestKey: (value: boolean) => void;
  editToggleCard: boolean;
  setEditToggleCard: (value: boolean) => void;
}

export default function CardAddAddress({
  requestKey,
  setRequestKey,
  editToggleCard,
  setEditToggleCard
}: CardAddAddressProps) {
  const [stateButton, setStateButton] = useState<
    '' | 'err' | 'loading' | 'success'
  >('');
  const [editToggle, setEditToggle] = useState(true);

  const [createDataAddress, setCreateDataAddress] = useState({
    street: '',
    neighborhood: '',
    number: '',
    state: '',
    city: '',
    cep: '',
    addressDetail: ''
  });

  function searchCep() {
    if (createDataAddress.cep.length === 8)
      requestCep(createDataAddress, setCreateDataAddress, setStateButton);
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateDataAddress({
      ...createDataAddress,
      [e.target.name]: e.target.value
    });
  };

  const success = () => {
    setEditToggleCard(!editToggleCard);
    setRequestKey(!requestKey);
  };

  function updateAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStateButton('loading');

    requestAddAddress(
      success,
      setStateButton,
      createDataAddress,
      setCreateDataAddress
    );
  }

  return (
    <Container displayToggle={editToggleCard}>
      <CardAddressStyle displayToggle={editToggleCard}>
        <form onSubmit={updateAddress}>
          <section>
            <InputInfoField
              nameInput={'CEP: (Apenas números)'}
              editToggle={editToggle}
              placeholder={'ex: 20765171'}
              name={'cep'}
              value={createDataAddress.cep}
              onChange={handleChangeText}
              marginRight={'10px'}
              maxWidth={'180px'}
            />
            <div className="containerIcon" onClick={searchCep}>
              <img src={iconsearch} alt="" />
            </div>
          </section>

          <section className="street">
            <InputInfoField
              nameInput={'Rua: '}
              editToggle={editToggle}
              placeholder={'ex: Rua nazaré'}
              name={'street'}
              value={createDataAddress.street}
              onChange={handleChangeText}
              marginRight={'10px'}
              maxWidth={'350px'}
            />
            <InputInfoField
              nameInput={'Número: '}
              editToggle={editToggle}
              placeholder={'ex: 782'}
              name={'number'}
              value={createDataAddress.number}
              onChange={handleChangeText}
              maxWidth={'90px'}
              type={'number'}
            />
          </section>

          <section className="neighborhoodAndNumber">
            <InputInfoField
              nameInput={'Bairro: '}
              editToggle={editToggle}
              placeholder={'ex: Inhaúma'}
              name={'neighborhood'}
              value={createDataAddress.neighborhood}
              onChange={handleChangeText}
              marginRight={'10px'}
            />
          </section>
          <InputInfoField
            nameInput={'Cidade: '}
            editToggle={editToggle}
            placeholder={'ex: Rio de Janeiro'}
            name={'city'}
            value={createDataAddress.city}
            onChange={handleChangeText}
          />
          <InputInfoField
            nameInput={'Complemento: '}
            editToggle={editToggle}
            placeholder={'ex: Ao lado da praça XV'}
            name={'addressDetail'}
            value={createDataAddress.addressDetail}
            onChange={handleChangeText}
          />

          <ButtonSubmitHover
            stateButton={stateButton}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        </form>
      </CardAddressStyle>
    </Container>
  );
}

const CardAddressStyle = styled.div<{ displayToggle: boolean }>`
  margin-top: 20px;
  background-color: white;
  width: 100%;

  border-radius: 10px;
  padding: 15px;
  overflow-y: hidden;
  padding-top: 20px;
  height: auto;

  section {
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;

    .containerIcon {
      background-color: purple;

      width: 90px;
      height: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 2px;
      border-radius: 3px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

      :hover {
        cursor: pointer;
      }
      img {
        width: 26px;
      }
    }
  }

  .iconToggle {
    position: relative;
    bottom: 25px;
    img {
      width: 20px;
      height: 20px;
    }
    border: none;
    background-color: transparent;
  }
`;

const Container = styled.div<{ displayToggle: boolean }>`
  margin-top: 10px;
  display: ${props => (props.displayToggle ? 'block' : 'none')};
`;
