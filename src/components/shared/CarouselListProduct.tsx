import React from 'react';
import styled from 'styled-components';
import CardCarouselOrdersAndProducts from '../screens/Home_Page/components/CardCarouselOrdersAndProducts';
import CardCarouselProduct from './CardCarouselProduct';
import iconExitFavorites from '../../assets/iconExitFavorites.svg';
import iconFavorited from '../../assets/iconFavorited.svg';
import addFavorites from '../../assets/addFavorites.svg';
import TitleAndArrow from './TitleAndArrow';
import PopsicleLoading from './Loaders/PopsicleLoading';
import { responseProductsWithoutCategories } from '../screens/MakeOrder_Page';
import { useState, useEffect } from 'react';
interface CarouselListProductProps {
  titleSession?: string;
  margin_top: number;
  objctResponseAPI: responseProductsWithoutCategories[];
  setProductIds?: (value: number[]) => void;
  productIds?: number[];
  amountSelection?: number;
  showPrice?: boolean;
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top,
  objctResponseAPI = [],
  setProductIds,
  productIds = [],
  amountSelection = 0,
  showPrice = false
}) => {
  const [productsSelecteds, setProductsSelecteds] = useState<string[]>([]);

  useEffect(() => {
    const filteredObject: string[] = objctResponseAPI
      .filter(productObj => productIds.includes(productObj.id))
      .map(productObj => productObj.name);

    setProductsSelecteds([...filteredObject]);
  }, [productIds]);

  function incrementProduct(idSelected: number) {
    const idsArr = [...productIds];

    const isSelectedCard = idsArr.includes(idSelected);

    if (isSelectedCard) {
      const index = idsArr.findIndex(productId => productId === idSelected);
      idsArr.splice(index, 1);
    } else if (amountSelection > productIds.length || productIds.length === 0) {
      idsArr.push(idSelected);
    }

    setProductIds?.(idsArr);
    return idsArr;
  }

  return (
    <CarouselListContainer margin_top={margin_top}>
      {titleSession && <TitleAndArrow titleSession={titleSession} />}
      <div className="listProductsAdd">{productsSelecteds}</div>
      {objctResponseAPI === null || objctResponseAPI === undefined ? (
        <PopsicleLoading />
      ) : (
        <div className="rowOfCardsContainer">
          {objctResponseAPI.map((order, index) =>
            titleSession === 'Mais pedidos' ? (
              <CardCarouselOrdersAndProducts
                key={index}
                image={order.image}
                description={order.description}
                price={Number(order.price)}
                icon={order.isFavorited ? iconFavorited : addFavorites}
              />
            ) : titleSession === 'Meus favoritos' ? (
              <CardCarouselOrdersAndProducts
                key={index}
                image={order.image}
                description={order.description}
                price={Number(order.price)}
                icon={iconExitFavorites}
              />
            ) : (
              <CardCarouselProduct
                key={index}
                image={order.image}
                price={order.price}
                quantityForUnity={order.quantityForUnity}
                id={order.id}
                unitOfMeasure={order.unitOfMeasure}
                incrementProduct={incrementProduct}
                name={order.name}
                showPrice={showPrice}
              />
            )
          )}
        </div>
      )}
    </CarouselListContainer>
  );
};

const CarouselListContainer = styled.div`
  margin-top: 0px;
  width: 100%;
  min-width: 100%;
  height: 100%;
  margin-right: 0;

  .rowOfCardsContainer {
    margin-top: ${(props: { margin_top: number }) => props.margin_top}px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow-x: scroll;
    padding-left: 13px;
    margin-right: 0px;
    padding-top: 100px;
  }
};
`;
export default CarouselListProduct;
