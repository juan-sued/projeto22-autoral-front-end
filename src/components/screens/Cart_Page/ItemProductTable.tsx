import styled from 'styled-components';
import { MdAdd, MdRemove } from 'react-icons/md';

import iconpositive from '@/assets/iconpositive.svg';
import { useCart } from '@/hooks/useCart';
import InputNumber from '@/components/shared/Inputs/InputNumber';
import imageAcai from '@/assets/copoHome.jpg';
import CheckboxBlock from '@/components/shared/Checkboxs/CheckBoxBlock';

interface ItemProductTableProps {
  image: string;

  name: string;
  price: string;
  subTotal: string;
  description: string;
  amount: number;
  id: number;
}

function ItemProductTable({
  image,
  price,
  subTotal,
  description,
  name,
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
      <CheckboxBlock />
      <img src={image ? image : imageAcai} alt="" />
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
              onClick={() => handleRemoveProduct(id)}
            >
              <MdRemove size={20} className="iconButton" />
            </button>
            <p className="countProduct">{amount}</p>
            <button
              className="iconButton"
              onClick={() => handleProductIncrement({ id, amount })}
            >
              <MdAdd className="iconButton" size={20} />
            </button>
          </div>
        </div>
      </div>
    </ItemProductTableStyle>
  );
}
export const ItemProductTableStyle = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  align-items: center;
  height: 100px;

  border-radius: 5px;

  img {
    height: 100%;
    border-radius: 10px;
  }
  .containerContent {
    width: 100%;
    padding: 10px 0px 10px 10px;

    .title {
      width: 100%;
      font-weight: 600;
      font-size: 22px;
    }

    .subContainer {
      display: flex;
      height: 60px;

      .subContainerCount {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 22px;
        color: black;

        button {
          border: none;
          border-radius: 5px;
          height: 30px;
          width: 30px;

          img {
            height: 30px;
            width: 30px;
            color: red;
          }
        }

        .countProduct {
          font-weight: 900;
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
          padding-top: 3px;
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
