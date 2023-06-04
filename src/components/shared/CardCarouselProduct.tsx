import styled from 'styled-components';

interface CardCarouselProductProps {
  image: string;
  description: string;
  price: number;
}

export default function CardCarouselProduct({
  image,
  description,
  price
}: CardCarouselProductProps) {
  return (
    <CardOfProduct>
      <div className="halfCircle">
        <img src={image} alt="" />
      </div>
      <h1 className="title">{description}</h1>
      <div className="priceProductContainer">
        <p className="priceProduct">R$ {price}</p>
      </div>
    </CardOfProduct>
  );
}

const CardOfProduct = styled.div`
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

  .title {
    font-size: 40px;
    margin-bottom: 48px;
    font-weight: 700;
  }

  .priceProductContainer {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    p {
      font-size: 20px;
      font-weight: 600;
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
    }
  }
`;
