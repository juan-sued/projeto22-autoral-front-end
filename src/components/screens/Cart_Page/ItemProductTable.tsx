import styled from 'styled-components';
import { MdAdd, MdRemove } from 'react-icons/md';

import { useCart } from '@/hooks/useCart';
import imageAcai from '@/assets/bowacaiamores.png';
import CheckboxBlock from '@/components/shared/Checkboxs/CheckboxBlock';
import { useState } from 'react';
interface ItemProductTableProps {
  image: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  id: number | string;
  selectProductInCart: (value: number | string) => void;
}

function ItemProductTable({
  image,
  price,
  description,
  name,
  amount,
  id,
  selectProductInCart
}: ItemProductTableProps) {
  const { updateProductAmount } = useCart();

  function handleProductIncrement({
    id,
    amount
  }: {
    id: number | string;
    amount: number;
  }) {
    updateProductAmount({ productId: id, amount: amount + 1 });
  }

  function handleProductDecrement({
    id,
    amount
  }: {
    id: number | string;
    amount: number;
  }) {
    updateProductAmount({ productId: id, amount: amount - 1 });
  }

  const [checked, setChecked] = useState(false);
  function selectedCard() {
    setChecked(state => !state);
    selectProductInCart(id);
  }

  return (
    <ItemProductTableStyle isChecked={checked}>
      <div className="containerCheck">
        <CheckboxBlock checked={checked} onClick={selectedCard} />
      </div>

      <img src={image.includes('https://') ? image : imageAcai} alt="" />
      <div className="containerContent">
        <div className="title">{name}</div>
        <div className="subContainer">
          <div className="subContainerPrice">
            <h2 className="description">{description}</h2>
            <p className="price">{price}</p>
          </div>
          <div className="subContainerCount">
            <button
              className="iconButton"
              onClick={() => handleProductDecrement({ id, amount })}
            >
              <MdRemove size={10} className="iconButton" />
            </button>
            <p className="countProduct">{amount}</p>
            <button
              className="iconButton"
              onClick={() => handleProductIncrement({ id, amount })}
            >
              <MdAdd className="iconButton" size={10} />
            </button>
          </div>
        </div>
      </div>
    </ItemProductTableStyle>
  );
}

interface ItemProductTableStyleProps {
  isChecked: boolean;
}

export const ItemProductTableStyle = styled.div<ItemProductTableStyleProps>`
  width: 100%;
  display: flex;
  height: 140px;

  align-items: center;
  border-radius: 5px;
  transition: all 0.1s ease-in;
  padding: 10px;

  background-color: ${props => (props.isChecked ? 'white' : 'transparent')};
  gap: 5px;

  :hover {
    background-color: white;
  }

  .containerCheck {
    height: 100%;
  }
  img {
    height: 85px;
    border-radius: 20px;
  }
  .containerContent {
    width: 100%;

    .title {
      width: 100%;
      font-weight: 600;
      font-size: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .subContainer {
      display: flex;
      height: 70px;

      .subContainerCount {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 22px;
        color: black;

        button {
          border: solid 1px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          height: 25px;
          width: 25px;
          display: grid;
          place-items: center;
        }

        .countProduct {
          font-weight: 900;
          font-size: 14px;
        }
      }

      .subContainerPrice {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: space-between;
        .description {
          height: 100%;

          padding-top: 5px;
        }
        .price {
          height: 100%;
          display: grid;
          align-items: end;
          font-size: 20px;
          font-weight: 900;
          color: purple;
        }
      }
    }
  }
`;
export default ItemProductTable;
