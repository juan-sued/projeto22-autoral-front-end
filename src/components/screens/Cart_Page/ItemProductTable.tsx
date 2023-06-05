import styled from 'styled-components';
import iconremove from '../../../assets/iconremove.svg';

import InputNumber from '../../shared/InputNumber';
import iconnegative from '../../../assets/iconnegative.svg';
import iconpositive from '../../../assets/iconpositive.svg';
import { useCart } from '../../../hooks/useCart';

interface ItemProductTableProps {
  image: string;
  price: number;
  subTotal: number;
  description: string;
  amount: number;
  id: number;
}

function ItemProductTable({
  image,
  price,
  subTotal,
  description,
  amount,
  id
}: ItemProductTableProps) {
  const { updateProductAmount, removeProduct } = useCart();

  function handleProductIncrement({
    id,
    amount
  }: {
    id: number;
    amount: number;
  }) {
    updateProductAmount({ productId: id, amount: amount + 1 });
  }

  function handleProductDecrement({
    id,
    amount
  }: {
    id: number;
    amount: number;
  }) {
    updateProductAmount({ productId: id, amount: amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <ItemProductTableStyle>
      <div className="itemTable">
        <div className="column">
          <div className="nameColumn">Açaí</div>
          <img className="productImage" src={image} alt="" />
          <div className="nameColumn description">{description}</div>
        </div>

        <div className="column">
          <div className="nameColumn">Preço</div>
          <p className="value">{price}</p>
        </div>

        <div className="column">
          <div className="nameColumn qtd">Qtd.</div>
          <div className="inputContainer">
            <button
              className="iconButton"
              onClick={() => handleProductIncrement({ id, amount })}
            >
              <img src={iconpositive} alt="" />
            </button>

            <InputNumber amount={amount} />

            <button
              className="iconButton"
              disabled={amount <= 1}
              onClick={() => handleProductDecrement({ id, amount })}
            >
              <img src={iconnegative} alt="" />
            </button>
          </div>
        </div>

        <div className="column">
          <div className="nameColumn">SubTotal</div>
          <p className="value">{subTotal}</p>
        </div>

        <div className="containerDivider">
          <div className="divider"></div>

          <div className="column buttons">
            <button
              className="iconButton"
              onClick={() => handleRemoveProduct(id)}
            >
              <img src={iconremove} alt="" />
            </button>
          </div>
        </div>
      </div>
    </ItemProductTableStyle>
  );
}

export const ItemProductTableStyle = styled.div`
  /* Estilos do componente ItemProductTable */
`;

export default ItemProductTable;
