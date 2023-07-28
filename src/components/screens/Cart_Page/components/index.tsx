import { useState } from 'react';
import { formatPrice } from '@/util/format';

import { Container } from './styles';
import styled from 'styled-components';

import requestOrder from './requestOrder';

import { CartProduct, useCart } from '@/hooks/useCart';

import { useAuth } from '@/hooks/useAuth';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import TitlePage from '@/components/shared/Titles/TitlePage';
import ItemProductTable from '../ItemProductTable';
import PopUp from '@/components/shared/Popups/PopUp';

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

  return (
    <>
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
          handleCreateOrder={handleCreateOrder}
          total={formatPrice(total)}
          productsIdsSelecteds={productsIdsSelecteds}
          setProductsIdsSelecteds={setProductsIdsSelecteds}
        />
      </Container>
    </>
  );
};

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
