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
import { Product } from '@/hooks/useProducts';
import { axiosI } from '@/services/axios';
import pagesRequests from '@/util/requests/pages/pagesRequests';
import productRequests from '@/util/requests/products/productsRequests';
import { useEffect, useState } from 'react';
import mocks from '../MakeOrder_Page/mock';

export interface HomeResponseAPI {
  listMyFavoriteds: Product[];
  listMoreOrders: Product[];
}

export default function HomePage() {
  const { userInfo, signOut, signed } = useAuth();

  const [objHomeResponseAPI, setObjHomeResponseAPI] =
    useState<HomeResponseAPI | null>(null);
  const [favoritedsList, setFavoritedsList] = useState<Product[]>([]);

  useEffect(() => {
    if (signed && axiosI.defaults.headers['Authorization'] !== undefined) {
      productRequests.getFavoriteds(favoritedsList, setFavoritedsList, signOut);
    }

    pagesRequests.homeContent(
      objHomeResponseAPI,
      setObjHomeResponseAPI,
      signOut
    );
  }, [signed]);

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
          objctResponseAPI={mocks.exampleHomeContent.listMoreOrders}
          titleSession={'Mais pedidos'}
          margin_top={-50}
        />

        {signed ? (
          <CarouselListProduct
            objctResponseAPI={mocks.exampleHomeContent.listMyFavoriteds}
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
}
