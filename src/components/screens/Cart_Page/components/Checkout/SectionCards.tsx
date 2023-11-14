import styled from 'styled-components';
import { useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import CardBorderLight, {
  RowOfCardsBorderLight
} from '@/components/shared/Cards/CardBorderLight';
import { FaMapMarked, FaMoneyBill } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { Address } from '@/components/screens/MyInformations_Page/MyInformation';


export interface IMethodPayment {
  id: number;
  title: string;
  lastForDigits: string;
}
export default function SectionCards() {
  const [toggleCardAddress, setToggleCardAddress] = useState(false);

  function handlerToggleCardAddress() {
    // if(toggleCardAddress === true) pega todos os endereços
    setToggleCardAddress(state => !state);
  }

  const [toggleCardPayment, setToggleCardPayment] = useState(false);

  function handlerToggleCardPayment() {
    setToggleCardPayment(state => !state);
  }

  const [listAddress, setListAddress] = useState<Address[]>([
    {
      id: 1,
      userId: 14,
      cep: '12345-673',
      street: 'Rua das Flores2',
      city: 'São Paulo3',
      state: 'SP',
      number: '123',
      neighborhood: 'Centro',
      addressesDetail: null,
      createdAt: '2023-07-11T06:48:13.287Z',
      updatedAt: '2023-07-11T06:48:13.290Z'
    },
    {
      id: 2,
      userId: 14,
      cep: '12345-673',
      street: 'Rua das Flores2',
      city: 'São Paulo3',
      state: 'SP',
      number: '123',
      neighborhood: 'Centro',
      addressesDetail: null,
      createdAt: '2023-07-11T06:48:13.287Z',
      updatedAt: '2023-07-11T06:48:13.290Z'
    },
    {
      id: 3,
      userId: 14,
      cep: '12345-673',
      street: 'Rua das Flores2',
      city: 'São Paulo3',
      state: 'SP',
      number: '123',
      neighborhood: 'Centro',
      addressesDetail: null,
      createdAt: '2023-07-11T06:48:13.287Z',
      updatedAt: '2023-07-11T06:48:13.290Z'
    }
  ]);
  const [listMethodPayment, setListMethodPayment] = useState<IMethodPayment[]>([
    {
      id: 1,
      title: 'Dinheiro',
      lastForDigits: ''
    },
    {
      id: 2,
      title: 'Cartão 1',
      lastForDigits: '4231'
    },
    {
      id: 3,
      title: 'Cartão 2',
      lastForDigits: '2312'
    },
    {
      id: 4,
      title: 'Cartão 3',
      lastForDigits: '5563'
    }
  ]);

  return (
    <SectionCardsStyle>
      <div className="columnOfCards">
        <CardBorderLight
          iconLeft={FaMapMarked}
          title="Endereço de entrega"
          description="Rua dona emília, Engenho da rainha"
          subDescription="nº 4341"
          iconRight={BsPencilSquare}
          functionToggle={handlerToggleCardAddress}
          toggleState={toggleCardAddress}
          titleSection="Endereços:"
        >
          <RowOfCardsBorderLight isAddress={true} arrAddress={listAddress} />
        </CardBorderLight>
        <CardBorderLight
          iconLeft={FaMoneyBill}
          title="Método de Pagamento"
          description="Dinheiro"
          subDescription="Clique para ver as opções de pagamento."
          iconRight={MdOutlineExpandMore}
          functionToggle={handlerToggleCardPayment}
          toggleState={toggleCardPayment}
          titleSection="Métodos:"
        >
          <RowOfCardsBorderLight arrMethodPayment={listMethodPayment} />
        </CardBorderLight>
      </div>
    </SectionCardsStyle>
  );
}


const SectionCardsStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 3px;

  box-shadow: inset 0px 10px 10px -10px rgba(0, 0, 0, 0.05),
    inset 0px -10px 10px -10px rgba(0, 0, 0, 0.05);

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    overflow-y: scroll;
    display: block;
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar-track {
    display: block;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: purple;
    width: 10px;
    border-radius: 10px;

    &:hover {
      background-color: #ccc;
    }
  }
  .columnOfCards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
