import { useState, useEffect } from 'react';
import ListCard from './ListCard';

import InputsRegisterProduct from './inputsRegisterProduct/InputsRegisterProduct';
import { Product } from '@/hooks/useProducts';
import acaibanana from '@/assets/bolaacaibanana.png';
import acaifruta2 from '@/assets/acaifruta2.png';
import copoHome from '@/assets/copoHome.jpg';
import copoHome2 from '@/assets/copoHome2.jpg';
import copoHome3 from '@/assets/copoHome3.jpg';
import copoacai from '@/assets/copoacai.svg';
import productRequests from '@/util/requests/products/productsRequests';
import ButtonAdd from '@/components/shared/Buttons/ButtonAdd';
import Main from '@/components/shared/Main';
import SearchBar from '@/components/shared/SearchBars/SearchBar';
import TitlePage from '@/components/shared/Titles/TitlePage';
import Modal from '@/components/shared/Modals/Modal';

interface SearchProduct {
  searchBar: string;
}

export default function StockPage() {
  const [responseProducts, setResponseProducts] = useState<Product[]>([]);

  const [searchProduct, setSearchProduct] = useState<SearchProduct>({
    searchBar: ''
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct({ ...searchProduct, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setResponseProducts([
      {
        id: 1,
        name: 'Açaí com banana',
        price: 2.5,
        image: acaibanana,
        category: 'produto x',
        isFavorited: false,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 2,
        name: 'banana',
        price: 2.5,
        image: acaifruta2,
        category: 'produto y',
        isFavorited: false,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'morango',
        price: 2.5,
        image: copoHome,
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'chocolate',
        price: 2.5,
        image: copoHome2,
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'morango',
        price: 2.5,
        image: copoHome3,
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'menta',
        price: 2.5,
        image: copoacai,
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      }
    ]);
    //requestGetProductsByCharacter(searchProduct, setResponseProducts);

    return () => {
      // cleanup
    };
  }, [searchProduct.searchBar]);

  const [toggleModal, setToggleModal] = useState(false);

  async function searchProducts() {
    const filteredsProducts: Product[] =
      await productRequests.getProductsByCharacter(searchProduct.searchBar);

    setResponseProducts(filteredsProducts);
  }

  return (
    <>
      {toggleModal ? (
        <Modal toggleModal={toggleModal} setToggleModal={setToggleModal}>
          <InputsRegisterProduct />
        </Modal>
      ) : (
        ''
      )}

      <TitlePage title={'Estoque'} to={'/'} />

      <SearchBar
        searchBar={searchProduct.searchBar}
        onChange={handleChangeText}
        sendSearch={searchProducts}
      />

      <Main margin_top={'80'}>
        <ListCard responseProducts={responseProducts} />
      </Main>

      <ButtonAdd toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </>
  );
}
