import React, { useState } from 'react';
import styled from 'styled-components';

import TitleAndArrow from '../Titles/TitleAndArrow';
import { IProductBasic } from '@/hooks/useProducts';
import CardCarouselProducts from '../Cards/CardCarouselProducts';

interface CarouselListProductProps {
  titleSession?: string;
  margin_top?: number;
  objctResponseAPI: IProductBasic[] | undefined;
  isCarouselFavorited?: boolean;
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top = -50,
  objctResponseAPI = [],
  isCarouselFavorited = false
}) => {
  return (
    <CarouselListContainer margin_top={margin_top}>
      {titleSession && <TitleAndArrow titleSession={titleSession} />}
      {objctResponseAPI.length === 0 ? (
        <div className="messageProduct">
          Nenhum produto favoritado &#128148;
        </div>
      ) : (
        <div className="rowOfCardsContainer">
          {objctResponseAPI.map((order, index) => (
            <CardCarouselProducts
              key={order.id}
              image={order.image}
              name={order.name}
              price={Number(order.price)}
              id={order.id}
              index={index}
              isFavorited={isCarouselFavorited}
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
  height: 100%;
  margin-right: 0;

  .messageProduct {
    height: 200px;
    display: grid;
    place-items: center;
    font-size: 20px;
    padding-top: 50px;
  }

  .rowOfCardsContainer {
    margin-top: ${props => props.margin_top}px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 13px;
    margin-right: 0px;
    padding-top: 150px;
    padding-bottom: 40px;
  }
`;

export default CarouselListProduct;
