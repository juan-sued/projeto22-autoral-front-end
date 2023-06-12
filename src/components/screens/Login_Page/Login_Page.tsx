import React from 'react';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import imageBoxIceCream from '@/assets/imageboxtemaclaro.webp';
import invertida from '@/assets/imageboxtemaclaroinvertida.webp';
import SingInForm from './SingInForm';
import imageBoxIceCreamVideo from '@/assets/dairystore.mp4';
import {
  ContainerVideo,
  ImageBoxIceCream,
  InvertidaBoxIceCream,
  Logo
} from './styles';
import Background from '@/components/shared/Background';
import ButtonOnlyWords from '@/components/shared/Buttons/ButtonOnlyWords';
import Main from '@/components/shared/Main';

const LoginPage: React.FC = () => {
  return (
    <>
      <Background
        backgroundColor={'#5645B7'}
        colorGradient={'#D782D2'}
        percentBackground={'15'}
        backgroundColorGrand={'#513ab3'}
      >
        <ImageBoxIceCream src={imageBoxIceCream} alt="" />
        <InvertidaBoxIceCream src={invertida} alt="" />
        <ContainerVideo>
          <video className="videoWrapper" autoPlay muted>
            <source src={imageBoxIceCreamVideo} type="video/mp4" />
          </video>
        </ContainerVideo>

        <Main margin_top={'90'}>
          <Logo src={logo} alt="" />
          <SingInForm />
          <Link to="/sign-up">
            <ButtonOnlyWords>Não possui cadastro? Clique aqui!</ButtonOnlyWords>
          </Link>
        </Main>
      </Background>
    </>
  );
};

export default LoginPage;
