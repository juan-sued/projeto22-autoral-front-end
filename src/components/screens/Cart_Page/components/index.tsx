import { useState } from 'react';
import { formatPrice } from '@/util/format';

import { Container } from './styles';
import styled from 'styled-components';
import { BsChevronCompactDown, BsPencilSquare } from 'react-icons/bs';
import { FaExpand, FaMapMarked, FaMoneyBill } from 'react-icons/fa';
import requestOrder from './requestOrder';

import { CartProduct, useCart } from '@/hooks/useCart';

import { useAuth } from '@/hooks/useAuth';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import TitlePage from '@/components/shared/Titles/TitlePage';
import ItemProductTable from '../ItemProductTable';
import PopUp from '@/components/shared/Popups/PopUp';
import {
  MdOutlineExpandMore,
  MdOutlinePayment,
  MdPayment
} from 'react-icons/md';

interface CartProps {
  message?: string;
}
export interface OrderData {
  products: CartProduct[];
  details: {
    total: number;
    subTotal: number;
  };
}

const Cart: React.FC<CartProps> = () => {
  const { signOut, signed } = useAuth();

  const { cart, setCart } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amountInCart)
  }));

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal + product.price * product.amountInCart;
  }, 0);

  function handleCreateOrder() {
    const orderData: OrderData = {
      products: cart,
      details: {
        total: total,
        subTotal: total
      }
    };

    const success = () => {
      setCart([]);
      localStorage.removeItem('gellatoCart');
    };
    console.log(orderData);

    //s requestOrder(orderData, signOut, success);
  }

  const [productsIdsSelecteds, setProductsIdsSelecteds] = useState<
    (number | string)[]
  >([]);
  function selectProductInCart(id: number | string) {
    const isSelected = productsIdsSelecteds.includes(id);

    if (isSelected) {
      const updatedSelecteds = productsIdsSelecteds.filter(
        productId => productId !== id
      );
      setProductsIdsSelecteds(updatedSelecteds);
    } else {
      const updatedSelecteds = [...productsIdsSelecteds, id];
      setProductsIdsSelecteds(updatedSelecteds);
    }
  }

  const [togglePopUp, setTogglePopUp] = useState(false);

  function closePopUp() {
    setTogglePopUp(state => !state);
  }
  //transformar os cards em components
  return (
    <>
      <SelectAddressAndObservationStyle togglePopUp={togglePopUp}>
        <div className="popUpCard">
          <div className="containerClose">
            <BsChevronCompactDown
              size={50}
              color="purple"
              onClick={closePopUp}
              className="icon"
            />
          </div>
          <div className="containerContent">
            <div className="card address">
              <div className="containerIcon">
                <FaMapMarked size={25} color="grey" />
              </div>
              <div className="contentCard">
                <h1 className="title">
                  <strong> Endereço de entrega</strong>
                </h1>
                <p>Rua dona emília, Engenho da rainha</p>
                <p>nº 4341</p>
              </div>
              <div className="containerIconEditAddress">
                <BsPencilSquare size={25} color="grey" />
              </div>
            </div>
            <div className=" card cardMethodPayment">
              <div className="containerIcon">
                <FaMoneyBill size={25} color="grey" />
              </div>
              <div className="contentCard">
                <h1 className="title">
                  <strong>Método de Pagamento</strong>
                </h1>
                <p>Clique para ver as opções de pagamento.</p>
              </div>
              <div className="containerIconEditAddress">
                <MdOutlineExpandMore size={25} color="grey" />
              </div>
            </div>
          </div>
        </div>
      </SelectAddressAndObservationStyle>
      <Back />
      <TitlePage title={'Meu Carrinho'} to={'/'} />
      <Container>
        <ProductTable>
          {cartFormatted.length === 0 ? (
            <PopUp
              title="Opss!"
              buttonTitle="Realizar pedido!"
              to="/make-order"
            >
              <p>Parece que seu carrinho está vazio... &#128553;</p>
              <p>Vamos rechear? &#129316;</p>
            </PopUp>
          ) : (
            cartFormatted.map((product, index) => (
              <ItemProductTable
                key={product.id}
                image={product.image}
                price={product.priceFormatted}
                description={'teste de descrição'}
                amount={product.amountInCart}
                name={product.name}
                id={product.id}
                selectProductInCart={selectProductInCart}
              />
            ))
          )}
        </ProductTable>
        <FooterWithPriceAndButton
          isCart={true}
          isSigned={signed}
          handleCreateOrder={closePopUp}
          total={formatPrice(total)}
          productsIdsSelecteds={productsIdsSelecteds}
          setProductsIdsSelecteds={setProductsIdsSelecteds}
        />
      </Container>
    </>
  );
};

interface SelectAddressAndObservationStyle {
  togglePopUp: boolean;
}

const SelectAddressAndObservationStyle = styled.section<SelectAddressAndObservationStyle>`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: grid;
  place-items: end;
  opacity: ${props => (props.togglePopUp ? 1 : 0)};
  pointer-events: ${props => (props.togglePopUp ? 'auto' : 'none')};
  transition: all 0.5s ease-in-out;

  .icon {
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .popUpCard {
    background-color: white;
    border-radius: 100px 100px 0 0;
    padding: 20px;
    height: 500px;
    width: 100%;
    transform: translateY(${props => (props.togglePopUp ? '0' : '100%')});
    opacity: ${props => (props.togglePopUp ? 1 : 0)};
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;

    display: flex;
    flex-direction: column;
    align-items: center;

    display: grid;
    place-items: center;

    .containerContent {
      display: grid;
      align-items: center;
      gap: 30px;
      width: 100%;

      place-items: center;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      .card {
        padding: 20px;
        display: flex;
        gap: 10px;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
          rgba(27, 31, 35, 0.3) 0px 0px 0px 1px;
        justify-content: space-between;
        align-items: start;
        width: 100%;
        max-width: 400px;
        min-height: 142px;

        h1 {
          font-size: 20px;
        }
        p {
          font-size: 18px;
        }

        :hover {
          background-color: rgba(27, 31, 35, 0.05);
          cursor: pointer;
        }
        .contentCard {
          display: grid;
          flex-direction: column;
          max-width: 200px;
          gap: 13px;
        }
      }
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .containerClose {
    display: grid;
    place-items: center;
  }
`;

const Back = styled.div`
  background-color: #eeedf4;
  position: fixed;
  min-height: 100%;
  min-width: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTable = styled.div`
  width: 100%;
`;

export default Cart;
