import Arvore_de_acai from '@/assets/arvoreacai.svg';
import CardOfert from './components/CardOfert';
import PlaceMyOrderButton from './components/PlaceMyOrderButton';
import TitleStatus from './components/TitleStatus';
import WellcomeUser from './components/WellcomeUser';
import SideBar from './components/sideBar';
import { ImageArvoreAcai } from './styles';

import CarouselListProduct from '@/components/shared/Carousels/CarouselListProduct';
import Divider from '@/components/shared/Dividers/Divider';
import FeedBacks from '@/components/shared/Feedback/Feedbacks';
import Main from '@/components/shared/Main';
import OurHistory from '@/components/shared/OurHistory/OurHistory';
import SocialsButtons from '@/components/shared/SocialsButtons/SocialsButtons';
import { useAuth } from '@/hooks/useAuth';
import { IProductBasic, useProduct } from '@/hooks/useProducts';
import { useEffect, useState } from 'react';
import mocks from '../MakeOrder_Page/mock';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';

export default function HomePage() {
  const { userInfo, signed, signOut } = useAuth();

  const { productsAndCategories } = useProduct();

  console.log(productsAndCategories?.products.favoriteds);
  if (productsAndCategories) {
    return (
      <>
        <SideBar />
        <TitleStatus />
        <Main margin_top={'100'}>
          <WellcomeUser userInfo={userInfo} />
          <CardOfert objHomeResponseAPI={mocks.exampleHomeContent} />
          <Divider />
          <PlaceMyOrderButton />
          <Divider />

          <CarouselListProduct
            objctResponseAPI={productsAndCategories?.products.notFavoriteds}
            titleSession={'Mais pedidos'}
            margin_top={-50}
          />

          {signed ? (
            <CarouselListProduct
              objctResponseAPI={productsAndCategories?.products.favoriteds}
              titleSession={'Meus favoritos'}
              margin_top={-50}
            />
          ) : (
            ''
          )}
          <FeedBacks titleSession={'Feedbacks'} />

          <SocialsButtons />

          <OurHistory />
        </Main>

        <ImageArvoreAcai src={Arvore_de_acai} alt="" />
      </>
    );
  } else {
    <Main margin_top="250">
      <PopsicleLoading />
    </Main>;
  }
}
