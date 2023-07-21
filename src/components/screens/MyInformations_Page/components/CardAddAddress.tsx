import { useState } from 'react';
import styled from 'styled-components';
import iconsearch from '@/assets/iconsearch.svg';
import addressesRequests from '@/util/requests/users/addresses/addressesRequests';
import ButtonSubmitHover from '@/components/shared/Buttons/ButtonSubmitHover';
import InputInfoField from '@/components/shared/Inputs/InputInfoField';
import { alertEmpty, clearFields } from '@/util/utilsFunctions';

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
    '' | 'err' | 'loading' | 'success' | string
  >('');
  const [editToggle, setEditToggle] = useState(false);

  const [createDataAddress, setCreateDataAddress] = useState({
    street: '',
    neighborhood: '',
    number: '',
    state: '',
    city: '',
    cep: '',
    addressesDetail: ''
  });

  function searchCep() {
    const cep = createDataAddress.cep;

    if (cep.length > 8) {
      const createDataAddressFormated = {
        ...createDataAddress,
        cep: cep.replace(/-/g, '')
      };

      addressesRequests.getCep(
        createDataAddressFormated,
        setCreateDataAddress,
        setStateButton
      );
    }
  }

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateDataAddress({
      ...createDataAddress,
      [e.target.name]: e.target.value
    });
  };

  const success = () => {
    setEditToggleCard(!editToggleCard);
    setCreateDataAddress(clearFields(createDataAddress));

    setRequestKey(!requestKey);
    setStateButton('');
  };

  function addAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alertEmpty(createDataAddress);

    setStateButton('loading');

    addressesRequests.postAddresses(
      success,
      setStateButton,
      createDataAddress,
      setCreateDataAddress
    );
  }

  return (
    <Container displayToggle={editToggleCard}>
      <CardAddressStyle displayToggle={editToggleCard}>
        <form onSubmit={addAddress}>
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
              type="TextArea"
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
              type="text"
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
            name={'addressesDetail'}
            value={createDataAddress.addressesDetail}
            onChange={handleChangeText}
            isRequired={false}
          />

          <ButtonSubmitHover
            stateButton={stateButton}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
            nameButton="ADICIONAR"
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
  animation: normal 0.5s fadeSmallBig;

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
