import Arvore_de_acai from '@/assets/arvoreacai.svg';
import CardOfert from './components/CardOfert';
import PlaceMyOrderButton from './components/PlaceMyOrderButton';
import TitleStatus from './components/TitleStatus';
import WellcomeUser from './components/WellcomeUser';
import SideBar from './components/sideBar';
import { ImageArvoreAcai } from './styles';
import { IoClose } from 'react-icons/io5';
import CarouselListProduct from '@/components/shared/Carousels/CarouselListProduct';
import Divider from '@/components/shared/Dividers/Divider';
import FeedBacks from '@/components/shared/Feedback/Feedbacks';
import Main from '@/components/shared/Main';
import OurHistory from '@/components/shared/OurHistory/OurHistory';
import SocialsButtons from '@/components/shared/SocialsButtons/SocialsButtons';
import { useAuth } from '@/hooks/useAuth';
import { useProduct } from '@/hooks/useProducts';
import mocks from '../MakeOrder_Page/mock';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import { useEffect, useState } from 'react';
import { axiosI } from '@/services/axios';
import styled from 'styled-components';
import PopUp from '@/components/shared/Popups/PopUp';

export default function HomePage() {
  const { userInfo, signed, signOut } = useAuth();
  const { productsAndCategories, setProductsAndCategories, keyRequest } =
    useProduct();

  const [notAuthorized, setNotAuthorized] = useState(false);
  useEffect(() => {
    if (signed) {
      axiosI
        .get('/products/products-favorites-categories')
        .then(({ data }) => {
          setProductsAndCategories(data);
        })
        .catch(err => {
          if (err.response && err.response.status === 401)
            setNotAuthorized(true);
          console.error('erro ao pegar produtos', err);
        });
    } else {
      axiosI
        .get('/products/products-categories')

        .then(({ data }) => {
          setProductsAndCategories(data);
        })
        .catch(err => {
          if (err.response && err.response.status === 401)
            setNotAuthorized(true);

          console.error('erro ao pegar produtos', err);
        });
    }
  }, [keyRequest]);

  if (productsAndCategories) {
    return (
      <>
        {notAuthorized ? (
          <PopUp title="Não autorizado!">
            <p>Opss! Parece que você precisa de login para isso.</p>
          </PopUp>
        ) : (
          ''
        )}

        <SideBar />
        <TitleStatus />
        <Main margin_top={'100'}>
          <WellcomeUser name={userInfo?.name} />
          <CardOfert objHomeResponseAPI={mocks.exampleHomeContent} />
          <Divider />
          <PlaceMyOrderButton />
          <Divider />

          <CarouselListProduct
            objctResponseAPI={productsAndCategories?.products.notFavoriteds}
            titleSession={'Mais pedidos'}
          />

          {signed ? (
            <CarouselListProduct
              objctResponseAPI={productsAndCategories?.products.favoriteds}
              titleSession={'Meus favoritos'}
              isCarouselFavorited={true}
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
