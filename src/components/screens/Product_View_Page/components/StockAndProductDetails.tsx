import styled from 'styled-components';
import { IProductById } from '@/hooks/useProducts';
import ContentStockView from './ContentStockView';
import wave from '@/assets/wave-purple.svg';
import React, { forwardRef } from 'react';
import CardProfileSocials from '@/components/shared/Cards/CardProfileSocials';
import CardBallsBack from '@/components/shared/Cards/CardBallsBack';
import TitleSectionMid from '@/components/shared/Titles/TitleSectionMid';
interface StockAndProductsDetailsProps {
  product: IProductById;
}

const StockAndProductsDetails: React.ForwardRefRenderFunction<
  HTMLDivElement,
  StockAndProductsDetailsProps
> = ({ product }, ref) => {
  return (
    <StockAndProductsDetailsStyle backgroundImage={product.image}>
      <img className="wave" src={wave} alt="ondas" />
      <div className="details" ref={ref}>
        <div className="containerCard">
          <TitleSectionMid titleSection="Vendidos" />
          <CardBallsBack colorBalls={'#53ef7d'} content={'15'} />
        </div>
        <div className="containerCard">
          <TitleSectionMid titleSection="Criado por" />
          <CardProfileSocials />
        </div>
        <div className="containerCard">
          <TitleSectionMid titleSection="Likes" />
          <CardBallsBack colorBalls={'#00f6ff'} content={'52'} />
        </div>
      </div>
      <ContentStockView product={product} />
    </StockAndProductsDetailsStyle>
  );
};

export default forwardRef(StockAndProductsDetails);

interface StockAndProductsDetailsStyleProps {
  backgroundImage: string;
}

const StockAndProductsDetailsStyle = styled.section<StockAndProductsDetailsStyleProps>`
  width: 100%;
  margin-top: -150px;

  background-color: #2f002f;

  .glassEffect {
    padding: 20px;
    width: fit-content;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-weight: 700;
    font-size: 18px;
    display: grid;
    place-items: center;
    transition: all 0.2s ease-in-out;
    :hover {
      cursor: pointer;
      transform: scale(1.06);
    }
  }
  .wave {
    margin-top: -190px;
  }
  .details {
    margin-top: 200px;
    padding: 20px;
    color: white;
    font-size: 21px;
    text-align: justify;
    line-height: 25px;
    transition: all 1s ease-in;
    display: grid;
    gap: 80px;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .containerCard {
    }
    strong {
      font-weight: 800;
    }
  }
`;
