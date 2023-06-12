import InputsRegister from './InputsRegister';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import imageBoxIceCream from '@/assets/imageboxicecream.webp';
import { ImageBoxIceCream, Logo } from './styles';
import Background from '@/components/shared/Background';
import ButtonOnlyWords from '@/components/shared/Buttons/ButtonOnlyWords';
import Main from '@/components/shared/Main';

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
