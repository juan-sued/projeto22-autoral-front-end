import styled from 'styled-components';
import { useState } from 'react';

interface SectionTotalProps {}

export default function SectionTotal({}: SectionTotalProps) {
  const [toggleViewPrices, setToggleViewPrices] = useState(false);

  //transformar os cards em components
  function handlerToggleViewPrices() {
    setToggleViewPrices(state => !state);
  }

  const rowsPrice = [
    {
      title: 'Total',
      price: 'R$ 26,98',
      isBold: false
    },
    {
      title: 'Cupom',
      price: 'R$5,00',
      isBold: false
    },
    {
      title: 'Desconto',
      price: 'R$ 1,99',
      isBold: false
    },
    {
      title: 'SubTotal',
      price: 'R$ 19,99',
      isBold: true
    }
  ];

  return (
    <SectionTotalStyle toggleViewPrices={toggleViewPrices}>
      {rowsPrice.map((row, index) => (
        <RowPrice
          key={index}
          functionAction={handlerToggleViewPrices}
          isBold={row.isBold}
          title={row.title}
          price={row.price}
        />
      ))}

      <div className="dashed"></div>
      <div className="sectionButton">
        <button className="editarOrder">Editar Pedido</button>
        <button className="sendOrder">Confirmar</button>
      </div>
    </SectionTotalStyle>
  );
}

interface RowPriceProps {
  isBold?: boolean;
  functionAction?: () => void;
  title: string;
  price: string;
}

function RowPrice({
  isBold = false,
  title,
  price,
  functionAction
}: RowPriceProps) {
  let color: string = 'black';
  const titleDefault = title.toLowerCase().trim();
  switch (titleDefault) {
    case 'cupom':
      color = 'red';
      break;
    case 'desconto':
      color = 'red';
      break;
    case 'subtotal':
      color = '#129316';
      break;

    default:
      color = 'black';
      break;
  }
  if (isBold) {
    return (
      <RowPriceStyle onClick={functionAction} title={title} colorPrice={color}>
        <h1 className="title">
          <strong>{title}</strong>
        </h1>
        <p className="price">
          <strong> {price} </strong>
        </p>
      </RowPriceStyle>
    );
  } else {
    console.log(titleDefault);
    return (
      <RowPriceStyle title={title} colorPrice={color}>
        <h1 className="title">{title}</h1>
        <p className="price">
          {titleDefault === 'cupom' || titleDefault === 'desconto'
            ? `- ${price}`
            : price}
        </p>
      </RowPriceStyle>
    );
  }
}

interface RowPriceStyleProps {
  title: string;
  colorPrice: string;
}

const RowPriceStyle = styled.div<RowPriceStyleProps>`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  .price {
    color: ${props => props.colorPrice};
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface SectionTotalStyleProps {
  toggleViewPrices: boolean;
}

const SectionTotalStyle = styled.section<SectionTotalStyleProps>`
  transition: height 0.3s ease-in;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border-radius: 10px;
  width: 100%;
  height: ${props => (props.toggleViewPrices ? '304px' : '135px')};
  cursor: pointer;
  @media screen and (max-width: 720px) {
    height: ${props => (props.toggleViewPrices ? '800px' : '179px')};
  }

  overflow: hidden;
  padding-bottom: 20px;
  .dashed {
    border-bottom: dashed 2px grey;
  }

  .sectionButton {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sendOrder {
      border-radius: 0 0 10px 0;
    }

    .editarOrder {
      background-color: transparent;
      text-decoration: underline 1px rgba(0, 0, 0, 0.5);
    }
    button {
      padding: 20px;
      font-size: 17px;
      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
