import React, { useState } from 'react';
import styled from 'styled-components';

import { formatListNames } from '@/util/utilsFunctions';
import { IStock } from '@/util/requests/products/stockRequests';
import CardCarouselStock from '../Cards/CardCarouselStock';

export interface CarouselListStockProps {
  margin_top?: number;
  objctResponseAPI: IStock[];
  setProductIds?: (value: number[]) => void;
  productIds?: number[];
  amountSelection?: number;
  showPrice?: boolean;
}

const CarouselListStock: React.FC<CarouselListStockProps> = ({
  margin_top = 50,
  objctResponseAPI = [],
  setProductIds,
  productIds = [],
  amountSelection = 1,
  showPrice = false
}) => {
  const [productsSelecteds, setProductsSelecteds] = useState<string[]>([]);

  function incrementProduct(idSelected: number) {
    const updatedProductIds = [...productIds];

    const isSelectedCard = updatedProductIds.includes(idSelected);

    if (isSelectedCard) {
      const index = updatedProductIds.findIndex(
        productId => productId === idSelected
      );
      updatedProductIds.splice(index, 1);
    } else if (
      amountSelection > updatedProductIds.length ||
      updatedProductIds.length === 0
    ) {
      updatedProductIds.push(idSelected);
    } else if (
      amountSelection === updatedProductIds.length &&
      !isSelectedCard
    ) {
      updatedProductIds.splice(updatedProductIds.length - 1, 1, idSelected);
    }

    setProductIds?.(updatedProductIds);

    const filteredObject: string[] = objctResponseAPI
      .filter(productObj => updatedProductIds.includes(productObj.id))
      .map(productObj => productObj.title);

    setProductsSelecteds(filteredObject);
    return updatedProductIds;
  }
  return (
    <CarouselListContainer margin_top={margin_top}>
      <div className="listProductsAdd">
        {productsSelecteds.length > 0
          ? `Você escolheu: ${formatListNames(productsSelecteds)}`
          : ''}
      </div>
      {objctResponseAPI.length === 0 ? (
        <div className="containerNoProduct">
          <h1>O estoque acabou! &#128553;</h1>
        </div>
      ) : (
        <div className="rowOfCardsContainer">
          {objctResponseAPI.map((order, index) => (
            <CardCarouselStock
              key={order.id}
              image={order.image}
              price={order.price}
              unit_of_measure={order.unit_of_measure}
              id={order.id}
              quantity_for_unity={order.quantity_for_unity}
              incrementStock={incrementProduct}
              title={order.title}
              showPrice={showPrice}
              isSelected={productIds.includes(order.id)}
              index={index}
            />
          ))}
        </div>
      )}
    </CarouselListContainer>
  );
};

const CarouselListContainer = styled.div<{ margin_top: number }>`
  margin-top: 50px;
  width: 100%;
  min-width: 100%;
  height: 100%;
  margin-right: 0;

  .containerNoProduct {
    height: 100px;
    display: grid;
    place-items: center;
    h1 {
      font-size: 20px;
    }
  }

  .listProductsAdd {
    padding-left: 10px;
    height: 16px;
    margin-bottom: 20px;
  }

  .rowOfCardsContainer {
    margin-top: ${props => props.margin_top}px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow-x: scroll;

    padding-left: 13px;
    margin-right: 0px;
    padding-top: 150px;
    padding-bottom: 20px;
  }
`;

export default CarouselListStock;
