import Main from '../../shared/Main';

import Background from '../../shared/Background.js';

import InputRegisterProduct from './InputsRegisterProduct';
import TitlePage from '../../shared/TitlePage';

export default function AddProductPage() {
  return (
    <>
      <TitlePage title={'Adicionar produto'} to={'/'} />
      <Main margin_top={'0'}>
        <InputRegisterProduct />
      </Main>
    </>
  );
}
