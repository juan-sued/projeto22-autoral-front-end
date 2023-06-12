import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

interface FooterWithPriceAndButtonProps {
  isCart?: boolean;
  isSigned?: boolean;
  total: string;
  handleCreateOrder: () => void;
  stateButton?: string;
}

export default function FooterWithPriceAndButton({
  isCart = false,
  isSigned = false,
  total,
  handleCreateOrder,
  stateButton = ''
}: FooterWithPriceAndButtonProps) {
  const navigate = useNavigate();
  if (isCart) {
    return (
      <footer>
        {isSigned ? (
          <button
            disabled={stateButton === 'loading' ? true : false}
            type="button"
            onClick={handleCreateOrder}
          >
            {stateButton === 'loading' ? <Loading /> : 'Finalizar Compra'}
          </button>
        ) : (
          <button
            disabled={stateButton === 'loading' ? true : false}
            type="button"
            onClick={() => navigate('/')}
          >
            {stateButton === 'loading' ? <Loading /> : 'Fazer login'}
          </button>
        )}
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    );
  } else {
    return (
      <FooterWithPriceAndButtonStyle>
        <footer>
          <button
            disabled={stateButton === 'loading' ? true : false}
            type="button"
            onClick={handleCreateOrder}
          >
            {stateButton === 'loading' ? <Loading /> : 'Adicionar ao carrinho'}
          </button>
          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </FooterWithPriceAndButtonStyle>
    );
  }
}

const FooterWithPriceAndButtonStyle = styled.div`
  background-color: red;

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: white;
    min-width: 100%;
    height: 80px;
    padding: 20px;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 2px 2px 0px 0px;
    z-index: 2;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      width: 155px;
      z-index: 3;
      min-height: 50px;
      display: grid;
      place-items: center;

      &:hover {
        background: #7159c1;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 25px;
    margin-left: 5px;
  }
}
`;
