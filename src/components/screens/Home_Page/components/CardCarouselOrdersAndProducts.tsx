import styled from 'styled-components';
import { formatPrice } from '@/util/format';

interface CardCarouselOrdersAndProductsProps {
  image: string;
  name: string;
  price: number;
  icon: string;
}

export default function CardCarouselOrdersAndProducts({
  image,
  name,
  price,
  icon
}: CardCarouselOrdersAndProductsProps) {
  const priceFormatted = formatPrice(price);

  return (
    <CardOfProduct>
      <div className="bannerContainer">
        <img className="banner" src={image} alt="" />
      </div>
      <div className="container">
        <h1 className="title">{name}</h1>
        <div className="priceProductContainer">
          <p className="priceProduct">{priceFormatted}</p>
          <img src={icon} alt="" />
        </div>
      </div>
    </CardOfProduct>
  );
}

const CardOfProduct = styled.div`
  height: 250px;
  min-width: 175px;
  max-width: 175px;
  background-color: #8e1c5a;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
  padding-top: 0;



  .bannerContainer {
    width: 100%;
    overflow: hidden;
    border-radius: 10px 10px 100px 100px;
box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    height: 100%;


  .banner{
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}




  .container{
    padding: 14px;
    width: 100%;
    display: grid;
    gap: 5px;
    .title {
    font-size: 20.5px;
    font-weight: 500;
    padding-bottom: 2px;
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
  }
}
`;
