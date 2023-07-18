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
import { useProduct } from '@/hooks/useProducts';
import mocks from '../MakeOrder_Page/mock';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import { useEffect } from 'react';
import { axiosI } from '@/services/axios';

export default function HomePage() {
  const { userInfo, signed, signOut } = useAuth();
  console.log('signed: ', signed);
  const { productsAndCategories, setProductsAndCategories, keyRequest } =
    useProduct();

  useEffect(() => {
    if (signed) {
      axiosI
        .get('/products/products-favorites-categories')
        .then(({ data }) => {
          setProductsAndCategories(data);
        })
        .catch(err => {
          console.log(err);
          console.error('erro ao pegar produtos', err);
        });
    } else {
      axiosI
        .get('/products/products-categories')

        .then(({ data }) => {
          setProductsAndCategories(data);
        })
        .catch(err => {
          console.log(err);
          console.error('erro ao pegar produtos', err);
        });
    }
  }, [keyRequest]);

  console.log(productsAndCategories);
  if (productsAndCategories) {
    return (
      <>
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
