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
interface CarouselListProductProps {
  titleSession?: string;
  margin_top: number;
  objctResponseAPI: responseProductsWithoutCategories[] | null | undefined;
  setProductIds?: (value: number[]) => void;
  productIds?: number[];
  amountSelection?: number;
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top,
  objctResponseAPI,
  setProductIds,
  productIds = [],
  amountSelection = 0
}) => {
  function incrementProduct(idSelected: number) {
    const newArr = [...productIds];

    const isSelectedCard = newArr.includes(idSelected);

    if (isSelectedCard) {
      const index = newArr.findIndex(productId => productId === idSelected);
      newArr.splice(index, 1);
    } else if (amountSelection > productIds.length || productIds.length === 0) {
      newArr.push(idSelected);
    }

    setProductIds?.(newArr);
    return newArr;
  }

  return (
    <CarouselListContainer margin_top={margin_top}>
      {titleSession && <TitleAndArrow titleSession={titleSession} />}

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
