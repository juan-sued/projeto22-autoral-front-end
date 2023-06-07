import React from 'react';
import styled from 'styled-components';
import CardCarouselOrdersAndProducts from '../screens/Home_Page/components/CardCarouselOrdersAndProducts';
import CardCarouselProduct from './CardCarouselProduct';
import iconExitFavorites from '../../assets/iconExitFavorites.svg';
import iconFavorited from '../../assets/iconFavorited.svg';
import addFavorites from '../../assets/addFavorites.svg';
import TitleAndArrow from './TitleAndArrow';
import { Product } from '../../hooks/useProducts';
import PopsicleLoading from './Loaders/PopsicleLoading';

interface CarouselListProductProps {
  titleSession: string;
  margin_top: number;
  objctResponseAPI: Product[] | null | undefined;
  setProductIds: (value: number[]) => void;
  productIds: number[];
  uniqueSelection: boolean;
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top,
  objctResponseAPI,
  setProductIds,
  productIds,
  uniqueSelection
}) => {
  function incrementProduct(idSelected: number) {
    const newArr = [...productIds];

    const isSelectedCard = newArr.some(productId => productId === idSelected);

    if (isSelectedCard) {
      const index = newArr.findIndex(productId => productId === idSelected);
      newArr.splice(index, 1);
    } else if (!uniqueSelection) {
      newArr.push(idSelected);
    }

    setProductIds(newArr);

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
                description={order.description}
                price={order.price}
                quantityForUnity={order.quantityForUnity}
                categoryId={order.categoryId}
                amount={order.amount}
                isFavorited={order.isFavorited}
                name={order.name}
                id={order.id}
                unitOfMeasure={order.unitOfMeasure}
                incrementProduct={incrementProduct}
              />
            )
          )}
        </div>
      )}
    </CarouselListContainer>
  );
};

const CarouselListContainer = styled.div`
  margin-top: 100px;
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
