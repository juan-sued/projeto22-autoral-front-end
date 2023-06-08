import styled from 'styled-components';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Product } from '../../hooks/useProducts';

interface CardCarouselProductProps
  extends Omit<
    Product,
    'categoryId' | 'description' | 'amount' | 'isFavorited'
  > {
  incrementProduct: (value: number) => number[];
}

export default function CardCarouselProduct({
  image,
  price,
  quantityForUnity,
  unitOfMeasure,
  id,
  incrementProduct,
  name
}: CardCarouselProductProps) {
  let scaleImage = 1;

  switch (quantityForUnity) {
    case 1:
      scaleImage = 1;
      break;
    case 1000:
      scaleImage = 1;
      break;
    case 700:
      scaleImage = 0.9;
      break;
    case 500:
      scaleImage = 0.8;
      break;
    case 400:
      scaleImage = 0.7;
      break;
    case 300:
      scaleImage = 0.6;
      break;
    default:
      scaleImage = 1;
      break;
  }
  const [isSelected, setIsSelected] = useState(false);

  function productClick(productClickedId: number) {
    const arr = incrementProduct(productClickedId);
    const selected = arr.includes(productClickedId);
    setIsSelected(selected);
    console.log(arr);
  }
  return (
    <CardOfProduct
      scaleImage={scaleImage}
      isSelected={isSelected}
      onClick={() => productClick(id)}
    >
      <div className="halfCircle">
        <img src={image} alt="" />
      </div>
      <h1 className="title">
        {unitOfMeasure === 'unity'
          ? name
          : quantityForUnity + '' + unitOfMeasure.toString()}
      </h1>
      <div className="priceProductContainer">
        <p className="priceProduct">R$ {price}</p>
        <BsCheckCircleFill
          size={16}
          className="iconCheck"
          color={isSelected ? 'green' : 'transparent'}
        />
      </div>
    </CardOfProduct>
  );
}

interface CardOfProductProps {
  scaleImage: number;
  isSelected: boolean;
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
  padding: 0 19px 19px 19px;
  color: white;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
  border: 3px solid ${props => (props.isSelected ? '#00A711' : 'transparent')};

  .title {
    font-size: 40px;
    margin-bottom: 48px;
    font-weight: 700;
  }

  .priceProductContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 20px;
      font-weight: 600;
    }
    .iconCheck {
      position: relative;
      left: 12px;
    }
  }

  .halfCircle {
    position: relative;
    bottom: 60px;
    min-height: 130px;
    width: 130px;
    background-color: #eeedf4;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
    padding-bottom: 55px;
    img {
      width: 167px;
      transform: scale(${props => props.scaleImage});
    }
  }
`;
