import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Product } from '@/hooks/useProducts';
import { formatListNames } from '@/util/utilsFunctions';
import CardCarouselOrdersAndProducts from '@/components/screens/Home_Page/components/CardCarouselOrdersAndProducts';
import CardCarouselProduct from '../Cards/CardCarouselProduct';
import PopsicleLoading from '../Loaders/PopsicleLoading';
import TitleAndArrow from '../Titles/TitleAndArrow';

interface CarouselListProductProps {
  titleSession?: string;
  margin_top: number;
  objctResponseAPI: Product[] | undefined;
  setProductIds?: (value: number[]) => void;
  productIds?: number[];
  amountSelection?: number;
  showPrice?: boolean;
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top,
  objctResponseAPI = [],
  setProductIds,
  productIds = [],
  amountSelection = 0,
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
      .map(productObj => productObj.name);

    setProductsSelecteds(filteredObject);
    return updatedProductIds;
  }
  const isMostOrdered = titleSession === 'Mais pedidos';
  const isFavorite = titleSession === 'Meus favoritos';
  //aas
  return (
    <CarouselListContainer margin_top={margin_top}>
      {titleSession && <TitleAndArrow titleSession={titleSession} />}
      <div className="listProductsAdd">
        {productsSelecteds.length > 0
          ? `Você escolheu: ${formatListNames(productsSelecteds)}`
          : ''}
      </div>
      {objctResponseAPI.length === 0 ? (
        <PopsicleLoading />
      ) : (
        <div className="rowOfCardsContainer">
          {objctResponseAPI.map((order, index) => {
            return (
              <React.Fragment key={order.id}>
                {isMostOrdered || isFavorite ? (
                  <CardCarouselOrdersAndProducts
                    isFavorited={order.isFavorited}
                    image={order.image}
                    name={order.name}
                    price={Number(order.price)}
                    id={order.id}
                    index={index}
                  />
                ) : (
                  <CardCarouselProduct
                    image={order.image}
                    price={order.price}
                    quantityForUnity={order.quantityForUnity}
                    id={order.id}
                    unitOfMeasure={order.unitOfMeasure}
                    incrementProduct={incrementProduct}
                    name={order.name}
                    showPrice={showPrice}
                    isSelected={productIds.includes(order.id)}
                    index={index}
                  />
                )}
              </React.Fragment>
            );
          })}
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

export default CarouselListProduct;
