import styled from 'styled-components';
import { formatPrice } from '@/util/format';
import CheckboxHeart from '@/components/shared/Checkboxs/CheckboxHeart';
import copoAcai from '@/assets/copoHome.jpg';
import { useProduct } from '@/hooks/useProducts';

import { useState } from 'react';

import { useInView } from 'react-intersection-observer';
import productRequests from '@/util/requests/products/productsRequests';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface CardCarouselProductsProps {
  image: string;
  name: string;
  price: number;
  id: number;
  index: number;
  isFavorited?: boolean;
}

export default function CardCarouselProducts({
  image,
  name,
  price,
  id,
  index,
  isFavorited = false
}: CardCarouselProductsProps) {
  const { setErrorResponse, errorResponse } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const priceFormatted = formatPrice(price);

  const { keyRequest, setKeyRequest } = useProduct();
  function selectedProduct() {
    try {
      updateIsFavorited(id);
      setKeyRequest(!keyRequest);
    } catch (error) {
      console.log('Erro ao favoritar', error);
    }
  }

  async function updateIsFavorited(productId: number) {
    try {
      setClicked(true);
      await productRequests.updateFavorited(productId, setErrorResponse);
      setTimeout(() => {
        setClicked(false);
      }, 1500);
    } catch (err) {
      return new Error('Erro ao atualizar favorito');
    }
  }

  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });
  const imageBanner = image.includes('https://') ? image : copoAcai;
  const delay = index / 5 + 0.8;

  return (
    <CardOfProductStyle
      ref={ref}
      inView={inView}
      delay={delay}
      selected={clicked}
    >
      <div
        className="bannerContainer"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img className="banner" src={imageBanner} alt="" />
        <div className="greyText">
          <h1>Ver</h1>
        </div>
      </div>
      <div className="container">
        <h1 className="title">{name}</h1>
        <div className="priceProductContainer">
          <p className="priceProduct">{priceFormatted}</p>
          <CheckboxHeart
            selectedProduct={selectedProduct}
            clicked={clicked}
            isFavorited={isFavorited}
          />
        </div>
      </div>
    </CardOfProductStyle>
  );
}

interface CardOfProductStyleProps {
  inView: boolean;
  delay: number;
  selected: boolean;
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
      ? `animation: fadeTranslate ${props.delay}s ease-in-out;animation-fill-mode: forwards;`
      : ''}
  ${props =>
    props.selected
      ? `animation: fadeClicked ${props.delay}s ease-in-out;animation-fill-mode: forwards;`
      : ''};
  :hover {
    .bannerContainer {
      border-radius: 10px 10px 10px 10px;
      transform: scale(0.9);
    }
  }
  .bannerContainer {
    width: 100%;
    overflow: hidden;
    border-radius: 10px 10px 100px 100px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    height: 100%;
    transition: all 0.5s ease-in-out;

    :hover {
      cursor: pointer;
    }
    :active {
      box-shadow: inset rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px;
    }

    .greyText {
      transition: all 0.3s ease-in-out;

      position: relative;
      background-color: rgba(0, 0, 0, 0.5);
      bottom: 176.6px;
      height: 101%;
      display: grid;
      place-items: center;
      opacity: 0;

      h1 {
        font-size: 30px;
        font-weight: 600;
      }
      :hover {
        opacity: 1;
      }
    }
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
`;
