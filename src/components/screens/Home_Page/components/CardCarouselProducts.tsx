import styled from 'styled-components';
import { formatPrice } from '@/util/format';
import CheckboxHeart from '@/components/shared/Checkboxs/CheckboxHeart';
import copoAcai from '@/assets/copoHome.jpg';
import { useProduct } from '@/hooks/useProducts';

import { useState } from 'react';

import { useInView } from 'react-intersection-observer';

interface CardCarouselProductsProps {
  image: string;
  name: string;
  price: number;
  id: number;
  index: number;
}

export default function CardCarouselProducts({
  image,
  name,
  price,
  id,
  index
}: CardCarouselProductsProps) {
  const priceFormatted = formatPrice(price);
  const { updateIsFavorited } = useProduct();
  const [clicked, setClicked] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  function selectedProduct() {
    try {
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
      setClicked(!clicked);
      updateIsFavorited(id);

      setIsHidden(false);
    } catch (error) {
      console.log('Erro ao favoritar', error);
    }
  }

  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });
  const imageBanner = image.includes('https://') ? image : copoAcai;
  const delay = index / 10 + 0.5;

  if (isHidden) {
    return null;
  } else {
    return (
      <CardOfProductStyle ref={ref} inView={inView} delay={delay}>
        <div className="bannerContainer">
          <img className="banner" src={imageBanner} alt="" />
        </div>
        <div className="container">
          <h1 className="title">{name}</h1>
          <div className="priceProductContainer">
            <p className="priceProduct">{priceFormatted}</p>
            <CheckboxHeart
              isHidden={isHidden}
              selectedProduct={selectedProduct}
              clicked={clicked}
              isFavorited={true}
            />
          </div>
        </div>
      </CardOfProductStyle>
    );
  }
}

interface CardOfProductStyleProps {
  inView: boolean;
  delay: number;
}
const CardOfProductStyle = styled.div<CardOfProductStyleProps>`
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
  opacity: 0;
  ${props =>
    props.inView
      ? ` ;animation: fadeTranslate ${props.delay}s ease-in-out;animation-fill-mode: forwards;`
      : ''}
  .bannerContainer {
    width: 100%;
    overflow: hidden;
    border-radius: 10px 10px 100px 100px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    height: 100%;
  }

  .banner {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .container {
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
      align-items: end;

      p {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  @keyframes fadeTranslate {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(-20px);
    }
  }
`;
