import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loaders/Loading';

import { MdDeleteForever } from 'react-icons/md';
import { useCart } from '@/hooks/useCart';
interface FooterWithPriceAndButtonProps {
  isCart?: boolean;
  isSigned?: boolean;
  total: string;
  handleCreateOrder: () => void;
  stateButton?: string;
  productsIdsSelecteds?: (number | string)[];
  setProductsIdsSelecteds?: (value: number[]) => void;
  setStateButton?: (value: string) => void;
  enableAdd?: boolean;
}

export default function FooterWithPriceAndButton({
  isCart = false,
  isSigned = false,
  total,
  handleCreateOrder,
  stateButton = '',
  productsIdsSelecteds = [],
  setProductsIdsSelecteds,
  setStateButton,
  enableAdd = false
}: FooterWithPriceAndButtonProps) {
  const navigate = useNavigate();
  const { removeAllProductsSelecteds } = useCart();

  const enable = (enableAdd && !isCart) || (!enableAdd && isCart);

  async function deleteProductsInCart() {
    try {
      if (setStateButton) setStateButton('loading');
      removeAllProductsSelecteds(productsIdsSelecteds);

      if (setProductsIdsSelecteds) setProductsIdsSelecteds([]);
    } catch (error) {
      console.log(error);
    }
  }

  function message() {
    alert('necessário adicionar ao menos um tamanho e sabor');
  }
  if (isCart && productsIdsSelecteds?.length === 0) {
    if (isSigned) {
      return (
        <FooterWithPriceAndButtonStyle enable={enable}>
          <footer>
            <button
              disabled={stateButton === 'loading' ? true : false}
              type="button"
              onClick={handleCreateOrder}
              className="finallyOrder"
            >
              {stateButton === 'loading' ? <Loading /> : 'Finalizar Compra'}
            </button>

            <Total enable={enable}>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </FooterWithPriceAndButtonStyle>
      );
    } else {
      return (
        <FooterWithPriceAndButtonStyle enable={enable}>
          <footer>
            <button
              disabled={stateButton === 'loading' ? true : false}
              type="button"
              onClick={() => navigate('/sign-in')}
            >
              {stateButton === 'loading' ? <Loading /> : 'Fazer login'}
            </button>

            <Total enable={enable}>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </FooterWithPriceAndButtonStyle>
      );
    }
  } else if (
    enable &&
    productsIdsSelecteds &&
    productsIdsSelecteds?.length > 0
  ) {
    return (
      <FooterWithPriceAndButtonStyle enable={enable}>
        <footer>
          <button
            className="buttonDelete"
            disabled={stateButton === 'loading' ? true : false}
            type="button"
            onClick={deleteProductsInCart}
          >
            {stateButton === 'loading' ? (
              <Loading />
            ) : (
              <MdDeleteForever size={25} />
            )}
          </button>
        </footer>
      </FooterWithPriceAndButtonStyle>
    );
  } else {
    return (
      <FooterWithPriceAndButtonStyle enable={enable}>
        <footer>
          <button
            className="buttonAddCart"
            disabled={stateButton === 'loading' ? true : false}
            type="button"
            onClick={enable ? handleCreateOrder : message}
          >
            {stateButton === 'loading' ? (
              <Loading />
            ) : enable ? (
              <p className="text"> Adicionar ao carrinho</p>
            ) : (
              <p className="text"> Escolha ao menos um tamanho e sabor</p>
            )}
          </button>
          <Total enable={enable}>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </FooterWithPriceAndButtonStyle>
    );
  }
}
interface FooterWithPriceAndButtonStyleProps {
  enable: boolean;
  isPossibleFinally?: boolean;
}
const FooterWithPriceAndButtonStyle = styled.div<FooterWithPriceAndButtonStyleProps>`
  z-index: 100000;
  overflow: hidden;

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
    gap: 10px;

    .finallyOrder {
      width: 100%;
      margin-right: 10px;
    }
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      z-index: 3;
      height: 50px;
      display: grid;
      place-items: center;

      &:hover {
        cursor: pointer;
        background: #594a9a;
      }
    }

    .buttonAddCart {
      transition: all 0.4s ease;

      min-width: ${props => (props.enable ? '50' : '100')}%;

      .text {
        animation: ${props =>
          props.enable
            ? 'fadeAnimation 1s ease-in forwards'
            : 'fadeOutAnimation 1s ease-in forwards'};
      }
    }
    .buttonDelete {
      width: 100%;
      background-color: #ff0000;
      :hover {
        cursor: pointer;
        background: #c62828;
      }
    }
  }

  @keyframes fadeOutAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface TotalProps {
  enable: boolean;
}

export const Total = styled.div<TotalProps>`
  transition: all 2s ease;
  display: ${props => (props.enable ? 'flex' : 'none')};
  align-items: baseline;
  animation: ${props => (props.enable ? 'fadeAnimation 2s ease-in' : 'none')};

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 25px;
    margin-left: 5px;
    font-weight: 400;
  }
`;
