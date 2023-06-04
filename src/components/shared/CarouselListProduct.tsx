import React from 'react';
import styled from 'styled-components';
import CardCarouselOrdersAndProducts from '../screens/Home_Page/components/CardCarouselOrdersAndProducts';
import CardCarouselProduct from './CardCarouselProduct';
import iconExitFavorites from '../../assets/iconExitFavorites.svg';
import iconFavorited from '../../assets/iconFavorited.svg';
import addFavorites from '../../assets/addFavorites.svg';
import TitleAndArrow from './TitleAndArrow';
import Loading from '../shared/Loading';

interface CarouselListProductProps {
  titleSession: string;
  margin_top: number;
  objctResponseAPI: {
    image: string;
    description: string;
    price: number;
    favorited?: boolean;
  }[];
}

const CarouselListProduct: React.FC<CarouselListProductProps> = ({
  titleSession,
  margin_top,
  objctResponseAPI
}) => {
  return (
    <CarouselListContainer margin_top={margin_top}>
      {titleSession && <TitleAndArrow titleSession={titleSession} />}

      {objctResponseAPI.length === 0 ? (
        <Loading />
      ) : (
        <div className="rowOfCardsContainer">
          {objctResponseAPI.map((order, index) =>
            titleSession === 'Mais pedidos' ? (
              <CardCarouselOrdersAndProducts
                key={index}
                image={order.image}
                description={order.description}
                price={order.price}
                icon={order.favorited ? iconFavorited : addFavorites}
              />
            ) : titleSession === 'Meus favoritos' ? (
              <CardCarouselOrdersAndProducts
                key={index}
                image={order.image}
                description={order.description}
                price={order.price}
                icon={iconExitFavorites}
              />
            ) : (
              <CardCarouselProduct
                key={index}
                image={order.image}
                description={order.description}
                price={order.price}
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
  height: 400px;
  margin-right: 0;

  .rowOfCardsContainer {
    margin-top: ${(props: { margin_top: number }) => props.margin_top}px;
    width: 100%;
    height: 290px;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow-x: scroll;
    padding-left: 13px;
    margin-right: 0px;
  }
};
`;
export default CarouselListProduct;
