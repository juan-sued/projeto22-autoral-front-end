import styled from 'styled-components';
import Main from '../../shared/Main';
import TitlePage from '../../shared/TitlePage';

import { useState, useEffect } from 'react';
import SearchBar from '../../shared/SearchBar';
import ListCard from './ListCard';
import requestGetProducts from '../../../util/requests/requestGetProducts';
import ButtonAdd from '../../shared/ButtonAdd';
import Modal from '../../shared/Modal';
import InputsRegisterProduct from './inputsRegister/InputsRegisterProduct';
import { Product } from '../../../hooks/useProducts';

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
    requestGetProducts(searchProduct, setResponseProducts);

    return () => {
      // cleanup
    };
  }, [searchProduct.searchBar]);

  const [toggleModal, setToggleModal] = useState(false);
  function closeModal() {
    setToggleModal(!toggleModal);
  }
  return (
    <>
      {toggleModal ? (
        <Modal functionToggle={closeModal}>
          <InputsRegisterProduct />
        </Modal>
      ) : (
        ''
      )}

      <TitlePage title={'Estoque'} to={'/'} />

      <SearchBar
        searchBar={searchProduct.searchBar}
        onChange={handleChangeText}
        sendSearch={() =>
          requestGetProducts(searchProduct, setResponseProducts)
        }
      />

      <Main margin_top={'80'}>
        <ListCard responseProducts={responseProducts} />
      </Main>

      <ButtonAdd functionToggle={closeModal} />
    </>
  );
}
