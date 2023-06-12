import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/util/format';

import { Container } from './styles';
import styled from 'styled-components';

import requestOrder from './requestOrder';

import { useCart } from '@/hooks/useCart';

import { useAuth } from '@/hooks/useAuth';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import TitlePage from '@/components/shared/Titles/TitlePage';
import ItemProductTable from '../ItemProductTable';

interface CartProps {
  message?: string;
  isSigned?: boolean;
}

const Cart: React.FC<CartProps> = ({ message, isSigned = false }) => {
  const { userInfo, signOut } = useAuth();

  const navigate = useNavigate();

  const { cart, setCart } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price * product.amount;
    }, 0)
  );

  function handleCreateOrder() {
    const order = cart.map(products => {
      return {
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        amount: products.amount
      };
    });

    const orderData = {
      user: userInfo?.id,
      order
    };

    const success = () => {
      setCart([]);
      localStorage.removeItem('gellatoCart');
    };

    requestOrder(orderData, signOut, success);
  }

  return (
    <>
      <Back />
      <TitlePage title={'Meu Carrinho'} to={'/'} />
      <Container>
        <ProductTable>
          {cartFormatted.map((product, index) => (
            <ItemProductTable
              key={product.id}
              image={product.image}
              price={Number(product.priceFormatted)}
              subTotal={Number(product.subTotal)}
              description={product.name}
              amount={product.amount}
              id={product.id}
            />
          ))}
        </ProductTable>
        <FooterWithPriceAndButton
          isCart={true}
          isSigned={isSigned}
          handleCreateOrder={handleCreateOrder}
          total={total.toString()}
        />
      </Container>
    </>
  );
};

const Back = styled.div`
  background-color: '#EEEDF4';
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
