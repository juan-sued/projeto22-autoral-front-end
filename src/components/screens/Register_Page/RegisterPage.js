import Main from '../../shared/Main';
import InputsRegister from './InputsRegister';
import ButtonOnlyWords from '../../shared/ButtonOnlyWords.js';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import Background from '../../shared/Background.js';
import imageBoxIceCream from '../../../assets/imageboxicecream.webp';
import { ImageBoxIceCream, Logo } from './styles';

export default function RegisterPage() {
  return (
    <>
      <Background
        backgroundColor={'#1C2156'}
        colorGradient={'#482D5F'}
        percentBackground={'15.5'}
        backgroundColorGrand={'#1C2156'}
      >
        <ImageBoxIceCream src={imageBoxIceCream} alt="" />
        <Main margin_top={'90'}>
          <Logo src={logo} alt="" />
          <InputsRegister />
          <Link to="/">
            <ButtonOnlyWords>Já possui cadastro? Faça login!</ButtonOnlyWords>
          </Link>
        </Main>
      </Background>
    </>
  );
}
