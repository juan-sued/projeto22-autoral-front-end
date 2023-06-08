import Main from '../../shared/Main';
import Arvore_de_acai from '../../../assets/arvoreacai.svg';
import { ImageArvoreAcai } from './styles';
import TitleStatus from './components/TitleStatus';
import SideBar from './components/sideBar';
import CardOfert from './components/CardOfert';
import WellcomeUser from './components/WellcomeUser';
import Divider from '../../shared/Divider';
import PlaceMyOrderButton from './components/PlaceMyOrderButton';
import CarouselListProduct from '../../shared/CarouselListProduct';
import FeedBacks from '../../shared/Feedback/Feedbacks';
import SocialsButtons from '../../shared/SocialsButtons/SocialsButtons';
import OurHistory from '../../shared/OurHistory/OurHistory';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { axiosI } from '../../../services/axios';
import { Product } from '../../../hooks/useProducts';
import productRequests from '../../../util/requests/products/productsRequests';
import pagesRequests from '../../../util/requests/pages/pagesRequests';

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
    if (signed && axiosI.defaults.headers['Authorization'] !== undefined)
      productRequests.getFavoriteds(favoritedsList, setFavoritedsList, signOut);

    pagesRequests.homeContent(
      objHomeResponseAPI,
      setObjHomeResponseAPI,
      signOut
    );

    return () => {
      setFavoritedsList([]);
      setObjHomeResponseAPI(null);
    };
  }, []);

  const objctResponseAPITest: HomeResponseAPI = {
    listMyFavoriteds: [
      {
        id: 0,
        name: 'Aveia',
        price: 27.0,
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',

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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',

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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
        image: 'cupBig',
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
          objctResponseAPI={objHomeResponseAPI?.listMoreOrders}
          titleSession={'Mais pedidos'}
          margin_top={50}
        />

        {signed ? (
          <CarouselListProduct
            objctResponseAPI={objHomeResponseAPI?.listMyFavoriteds}
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
