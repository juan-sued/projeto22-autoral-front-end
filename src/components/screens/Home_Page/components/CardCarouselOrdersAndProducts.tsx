import styled from 'styled-components';
import { formatPrice } from '../../../../util/format';

interface CardCarouselOrdersAndProductsProps {
  image: string;
  description: string;
  price: number;
  icon: string;
}

export default function CardCarouselOrdersAndProducts({
  image,
  description,
  price,
  icon
}: CardCarouselOrdersAndProductsProps) {
  const priceFormatted = formatPrice(price);

  return (
    <CardOfProduct>
      <img className="banner" src={image} alt="" />

      <h1 className="title">{description}</h1>
      <div className="priceProductContainer">
        <p className="priceProduct">priceFormatted</p>
        <img src={icon} alt="" />
      </div>
    </CardOfProduct>
  );
}

const CardOfProduct = styled.div`
  height: 250px;
  width: 165px;
  max-width: 175px;
  background-color: #8e1c5a;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px 14px 14px;
  color: white;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
  padding-top: 0;

  .title {
    font-size: 40px;
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
  }

  .banner {
    margin-top: -1px;
    min-width: auto;
    max-width: 173px;
    border-radius: 10px 10px 60px 60px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
}
`;
