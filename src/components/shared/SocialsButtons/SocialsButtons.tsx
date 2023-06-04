import styled from 'styled-components';

import iconwhatsapp from '../../../assets/iconwhatsapp.svg';
import iconinstagram from '../../../assets/iconinstagram.svg';
import iconfacebook from '../../../assets/iconfacebook.svg';
import icontwitter from '../../../assets/icontwitter.svg';
import messagecomic from '../../../assets/messagecomic.svg';
import background1 from '../../../assets/fundoredessociais4.jpg';

import CardSocials from './CardSocials';
import TitleAndArrow from '../TitleAndArrow';

interface SocialButton {
  icon: string;
  contact: string;
  messageButton: string;
  link: string;
  introduction: string;
  text: string;
  color: string;
}

export default function SocialsButtons() {
  const listIconsSocial: SocialButton[] = [
    {
      icon: iconwhatsapp,
      contact: '(21) 98498-0723',
      messageButton: 'ENVIAR MENSAGEM',
      link: 'https://wa.me/5521984980723?text=Boa%20tarde,%20Juan!%0AVoc%C3%AAs%20entregam%20em%20Iraj%C3%A1?%20Obrigado!',
      introduction: 'Olá, sou a Adriana, como posso ajudá-lo?',
      text: 'Horário de atendimento: \n Segunda à Sexta de 9:00 às 18:00. \n Finais de Semana de 10:00 às 20:00.',
      color: '#07ef1e'
    },
    {
      icon: iconinstagram,
      contact: '@_gellatoacaiteria',
      messageButton: 'SEGUIR',
      link: 'https://www.instagram.com/_gellatoacaiteria/',
      introduction: 'Oi! Segue a gente no insta que tem sempre novidade!',
      text: 'Lá você encontra: \n Promoções imperdíveis. \n Avisos importantes e Sorteios!',
      color: '#F657E7'
    },
    {
      icon: iconfacebook,
      contact: '@_gellatoacaiteria',
      messageButton: 'ADICIONAR',
      link: 'https://wa.me/5521984980723?text=Boa%20tarde,%20Juan!%0AVoc%C3%AAs%20entregam%20em%20Iraj%C3%A1?%20Obrigado!',
      introduction: 'Olá, sou a Adriana, como posso ajudá-lo?',
      text: 'Em breve',
      color: '#5B6BF9'
    },
    {
      icon: icontwitter,
      contact: '@_gellatoacaiteria',
      messageButton: 'SEGUIR',
      link: 'https://wa.me/5521984980723?text=Boa%20tarde,%20Juan!%0AVoc%C3%AAs%20entregam%20em%20Iraj%C3%A1?%20Obrigado!',
      introduction: 'Segue a gente aí, Meu padrinho',
      text: 'Em breve',
      color: '#00acee'
    }
  ];

  return (
    <Container>
      <TitleAndArrow titleSession={'Redes sociais'} />

      <SocialButtons>
        <div className="container">
          {listIconsSocial.map((socialButton, index) => (
            <CardSocials
              key={index}
              icon={socialButton.icon}
              contact={socialButton.contact}
              messageButton={socialButton.messageButton}
              link={socialButton.link}
              index={index}
              introduction={socialButton.introduction}
              text={socialButton.text}
              color={socialButton.color}
            />
          ))}
        </div>
      </SocialButtons>
      <div className="containerComic">
        <img className="messageComic" src={messagecomic} alt="" />
      </div>

      <Background>
        <BackImage backgroundImage={background1} />
        <div className="degrade"></div>
      </Background>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 80px;
  min-width: 100%;
  padding-top: 50px;
  height: 1400px;

  .containerComic {
    z-index: 5;
    display: flex;
    justify-content: center;
    width: 100%;

    position: absolute;
    bottom: 1440px;

    img {
      width: 30%;
      min-width: 240px;
    }
  }
`;

const SocialButtons = styled.div`
  width: 100%;
  padding: 10px 20px 10px 20px;
  max-height: 1900px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 80px;

  .container {
    height: 400px;
    width: 100%;
  }
`;

const Background = styled.div`
  .degrade {
    position: absolute;
    z-index: -2;
    bottom: 1px;
    right: 0;
    left: 0;

    min-height: 1900px;
    min-width: 100%;

    background-image: linear-gradient(0deg, transparent 40%, #eeedf4 99%);
  }
`;

const BackImage = styled.img`
  background-image: url(${(props: { backgroundImage: string }) =>
    props.backgroundImage});
  filter: brightness(70%);
  box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.5);
  background-repeat: repeat;
  bottom: 0;
  z-index: -3;
  position: absolute;
  min-height: 1900px;
  width: 100%;
  max-width: 100%;
  left: 0;
`;
