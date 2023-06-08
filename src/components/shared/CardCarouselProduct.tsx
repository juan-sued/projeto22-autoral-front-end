import styled from 'styled-components';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Product } from '../../hooks/useProducts';

interface CardCarouselProductProps
  extends Omit<Product, 'category' | 'description' | 'amount' | 'isFavorited'> {
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
      <div className="containerTitle">
        <h1 className="title">
          {unitOfMeasure === 'unity'
            ? name
            : quantityForUnity + unitOfMeasure.toString()}
        </h1>
      </div>

      <div className="priceProductContainer">
        <p className="priceProduct">
          {unitOfMeasure === 'unity' ? '' : 'R$ ' + price}
        </p>
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

  .containerTitle {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    .title {
      font-size: 25px;
      font-weight: 700;
      text-align: center;
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
    max-height: 130px;
    width: 130px;
    background-color: #eeedf4;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 167px;
      transform: scale(${props => props.scaleImage});
    }
  }
`;
