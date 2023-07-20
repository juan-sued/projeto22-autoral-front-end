import { useState, useEffect } from 'react';
import ListCard from './ListCard';

import InputsRegisterProduct from './inputsRegisterProduct/InputsRegisterProduct';

import productRequests from '@/util/requests/products/productsRequests';
import ButtonAdd from '@/components/shared/Buttons/ButtonAdd';
import Main from '@/components/shared/Main';
import SearchBar from '@/components/shared/SearchBars/SearchBar';
import TitlePage from '@/components/shared/Titles/TitlePage';
import Modal from '@/components/shared/Modals/Modal';
import { IStockBasic } from '@/util/requests/products/stockRequests';

interface SearchProduct {
  searchBar: string;
}

export default function StockPage() {
  const [responseProducts, setResponseProducts] = useState<IStockBasic[]>([]);

  const [searchProduct, setSearchProduct] = useState<SearchProduct>({
    searchBar: ''
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct({ ...searchProduct, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    //requestGetProductsByCharacter(searchProduct, setResponseProducts);

    return () => {
      // cleanup
    };
  }, [searchProduct.searchBar]);

  const [toggleModal, setToggleModal] = useState(false);

  async function searchProducts() {
    const filteredsProducts: IStockBasic[] | null =
      await productRequests.getProductsByCharacter(searchProduct.searchBar);
    if (filteredsProducts) setResponseProducts(filteredsProducts);
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
