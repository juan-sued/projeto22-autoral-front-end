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

  const objctResponseAPITest: HomeResponseAPI = {
    listMyFavoriteds: [
      {
        id: 0,
        name: 'Aveia',
        price: 27.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 1,
        name: 'Amendoim',
        price: 27.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 11,
        category: 'categoria x'
      },
      {
        id: 2,
        name: 'Biscoito',
        price: 19.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 3,
        name: 'Confete',
        price: 15.0,
        image: 'https://http.cat/status/102',

        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 4,
        name: 'Flocos de Arroz',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Granola',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 5,
        name: 'Granulado de chocolate',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 6,
        name: 'Granola',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 7,
        name: 'Jujuba',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 8,
        name: 'Leite em pó',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 9,
        name: 'Paçoca',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 10,
        name: 'Sucrilhos',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      }
    ],
    listMoreOrders: [
      {
        id: 0,
        name: 'Aveia',
        price: 27.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 1,
        name: 'Amendoim',
        price: 27.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 11,
        category: 'categoria x'
      },
      {
        id: 2,
        name: 'Biscoito',
        price: 19.0,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 3,
        name: 'Confete',
        price: 15.0,
        image: 'https://http.cat/status/102',

        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 4,
        name: 'Flocos de Arroz',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: 'Granola',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 5,
        name: 'Granulado de chocolate',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 6,
        name: 'Granola',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 7,
        name: 'Jujuba',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 8,
        name: 'Leite em pó',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 9,
        name: 'Paçoca',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      },
      {
        id: 10,
        name: 'Sucrilhos',
        price: 10.5,
        image: 'https://http.cat/status/102',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1,
        category: 'categoria x'
      }
    ]
  };

  return (
    <>
      <SideBar />
      <TitleStatus />
      <Main margin_top={'100'}>
        <WellcomeUser userInfo={userInfo} />
        <CardOfert objHomeResponseAPI={objctResponseAPITest} />
        <Divider />
        <PlaceMyOrderButton />
        <Divider />

        <CarouselListProduct
          objctResponseAPI={objctResponseAPITest?.listMoreOrders}
          titleSession={'Mais pedidos'}
          margin_top={50}
        />

        {signed ? (
          <CarouselListProduct
            objctResponseAPI={objctResponseAPITest?.listMyFavoriteds}
            titleSession={'Meus favoritos'}
            margin_top={50}
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
