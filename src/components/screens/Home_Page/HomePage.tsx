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
import copoHome2 from '../../../assets/copoHome2.jpg';
import copoHome3 from '../../../assets/copoHome3.jpg';
import bowlacai from '../../../assets/bowlacai.png';
import FeedBacks from '../../shared/Feedback/Feedbacks';
import SocialsButtons from '../../shared/SocialsButtons/SocialsButtons';
import OurHistory from '../../shared/OurHistory/OurHistory';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import requestHomeContent from '../../../util/requests/requestHomeContent';
import { axiosI } from '../../../services/axios';
import requestFavoriteds from '../../../util/requests/requestFavoriteds';
import { Product } from '../../../hooks/useProducts';

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
      requestFavoriteds(favoritedsList, setFavoritedsList, signOut);

    requestHomeContent(objHomeResponseAPI, setObjHomeResponseAPI, signOut);

    return () => {
      setFavoritedsList([]);
      setObjHomeResponseAPI(null);
    };
  }, []);

  const objctResponseAPITest: HomeResponseAPI = {
    listMyFavoriteds: [
      {
        id: 1,
        name: 'e',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 1,
        isFavorited: false,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 2,
        name: 'banana',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 2,
        isFavorited: false,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 3,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 3,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 4,
        name: 'chocolate',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 4,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 5,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 5,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 6,
        name: 'menta',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 7,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      }
    ],
    listMoreOrders: [
      {
        id: 1,
        name: 'e',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 1,
        isFavorited: false,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 2,
        name: 'banana',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 2,
        isFavorited: false,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 3,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 3,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 4,
        name: 'chocolate',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 4,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 5,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 5,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
      },
      {
        id: 6,
        name: 'menta',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 7,
        isFavorited: true,
        description: '1 Litro',
        amount: 10
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
