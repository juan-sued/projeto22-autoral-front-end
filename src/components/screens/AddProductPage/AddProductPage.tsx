import Main from '../../shared/Main';
import TitlePage from '../../shared/TitlePage';
import InputsRegisterProduct from './inputsRegister/InputsRegisterProduct';

export default function AddProductPage() {
  return (
    <>
      <TitlePage title={'Adicionar produto'} to={'/'} />
      <Main margin_top={'0'}>
        <InputsRegisterProduct />
      </Main>
    </>
  );
}
