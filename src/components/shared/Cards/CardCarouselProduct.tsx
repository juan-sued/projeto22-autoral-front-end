import styled from 'styled-components';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Product } from '@/hooks/useProducts';
import { formatPrice } from '@/util/format';
import { useInView } from 'react-intersection-observer';

interface CardCarouselProductProps
  extends Omit<Product, 'category' | 'description' | 'amount' | 'isFavorited'> {
  incrementProduct: (value: number) => number[];
  showPrice: boolean;
  isSelected: boolean;
  index: number;
}

export default function CardCarouselProduct({
  image,
  price,
  quantityForUnity,
  unitOfMeasure,
  id,
  incrementProduct,
  name,
  showPrice,
  isSelected = false,
  index
}: CardCarouselProductProps) {
  let scaleImage = 0.5;

  switch (quantityForUnity) {
    case 1000:
      scaleImage = 0.7;
      break;
    case 700:
      scaleImage = 0.6;
      break;
    case 500:
      scaleImage = 0.5;
      break;
    case 400:
      scaleImage = 0.4;
      break;
    case 300:
      scaleImage = 0.38;
      break;
    default:
      scaleImage = 0.7;
      break;
  }

  const textShowUnity = '( ' + quantityForUnity + ' Un)';

  const showUnity =
    quantityForUnity > 1 && quantityForUnity < 300 ? textShowUnity : '';
  const priceFormatted = formatPrice(price);

  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });
  const delay = index / 10 + 0.5;

  return (
    <CardOfProduct
      ref={ref}
      inView={inView}
      delay={delay}
      scaleImage={scaleImage}
      isSelected={isSelected}
      onClick={() => incrementProduct(id)}
    >
      <div className="halfCircle">
        <img src={image} alt="" />
      </div>
      <div className="containerTitle">
        <h1 className="title">
          {unitOfMeasure === 'unity'
            ? name
            : quantityForUnity + unitOfMeasure.toString()}
        </h1>
        <p className="description">{showUnity}</p>
      </div>

      <div className="priceProductContainer">
        <p className="priceProduct">{showPrice ? priceFormatted : ''}</p>
        <BsCheckCircleFill
          size={16}
          className="iconCheck"
          color={isSelected ? '#7fff7f' : 'transparent'}
        />
      </div>
    </CardOfProduct>
  );
}

interface CardOfProductProps {
  scaleImage: number;
  isSelected: boolean;
  inView: boolean;
  delay: number;
}

const CardOfProduct = styled.div<CardOfProductProps>`
  height: 250px;
  width: 175px;
  min-width: 175px;
  background-color: #8e1c5a;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 19px 15px 19px;
  color: ${props => (props.isSelected ? '#7fff7f' : 'white')};
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
  border: 3px solid ${props => (props.isSelected ? '#7fff7f' : 'transparent')};
  opacity: 0;
  ${props =>
    props.inView
      ? ` animation: fadeTranslate ${props.delay}s ease-in-out;animation-fill-mode: forwards;`
      : ''}

  .containerTitle {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 25px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 10px;
    }
  }

  .priceProductContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    bottom: 0px;

    p {
      font-size: 20px;
      font-weight: 600;
    }
    .iconCheck {
      position: relative;
      left: 12px;
      top: 9px;
    }
  }

  .halfCircle {
    position: relative;
    margin-top: -60px;
    min-height: 130px;

    max-height: 130px;
    width: 130px;
    background-color: #eeedf4;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 167px;
      transform: scale(${props => (props.isSelected ? '1' : props.scaleImage)})
        translateY(${props => (props.isSelected ? '-50px' : '0')});
      transition: transform 0.2s ease-in-out;
      border-radius: 100px;
    }
  }

  @keyframes fadeTranslate {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(-5px);
    }
  }
`;
