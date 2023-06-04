import styled from 'styled-components';
import iconremove from '../../../assets/iconremove.svg';

import { useState } from 'react';
import InputNumber from '../../shared/InputNumber';
import iconnegative from '../../../assets/iconnegative.svg';
import iconpositive from '../../../assets/iconpositive.svg';
import { useCart } from '../../../hooks/useCart';
function ItemProductTable({ image, price, subTotal, description, amount, id }) {
  const { updateProductAmount, removeProduct } = useCart();

  function handleProductIncrement({ id, amount }) {
    updateProductAmount({ productId: id, amount: amount + 1 });
  }

  function handleProductDecrement({ id, amount }) {
    updateProductAmount({ productId: id, amount: amount - 1 });
  }

  function handleRemoveProduct(productId) {
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
            <button className="iconButton" onClick={() => handleRemoveProduct(id)}>
              <img src={iconremove} alt="" />
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

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  background-color: #9747ff;
  border-radius: 5px;

  .itemTable {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-top: 14px;
    padding-bottom: 14px;
    color: white;
    font-weight: 700;
    height: 130px;
    align-items: center;

    .qtd {
      margin-bottom: 10px;
    }
    .containerDivider {
      display: flex;
      height: 100%;
      width: 35px;
      justify-content: space-between;
    }

    .divider {
      height: 100%;
      width: 1px;
      background-color: white;
    }
    .column {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .value {
        margin-bottom: 18px;
      }

      .nameColumn {
        font-size: 17px;
      }
      img {
        width: 20px;
        height: 20px;
      }

      .value {
        font-size: 16px;
      }
      button {
        background-color: transparent;
        border: none;

        margin-right: -4px;
        ::hover {
          cursor: pointer;
          box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
      }
    }

    .productImage {
      min-height: 50px;
      min-width: fit-content;
      border-radius: 100px;
    }
    .column .description {
      font-size: 14px;
    }
    .buttons {
      justify-content: center;
    }
  }
`;
export default ItemProductTable;
