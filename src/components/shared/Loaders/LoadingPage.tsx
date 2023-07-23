import React from 'react';
import styled from 'styled-components';
import logo from '@/assets/logo.png';
interface LoadingPageProps {}

const LoadingPage: React.FC<LoadingPageProps> = () => {
  return (
    <ContainerLoadingPage>
      <img src={logo} alt="" />
      <span className="loader"></span>
    </ContainerLoadingPage>
  );
};

const ContainerLoadingPage = styled.div<{}>`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  background-color: #5645b7;

  img {
    min-height: 73px;
  }
  .loader {
    width: 100%;
    height: 4.8px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
    max-width: 150px;
    border-radius: 100px;
  }
  .loader::after {
    content: '';
    width: 0%;
    height: 4.8px;
    background-color: #fff;
    background-image: linear-gradient(
      45deg,
      #c96cd4 25%,
      transparent 25%,
      transparent 50%,
      #c96cd4 50%,
      #c96cd4 75%,
      transparent 75%,
      transparent
    );
    background-size: 15px 15px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: animFw 1s ease-in forwards;
  }

  @keyframes animFw {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
export default LoadingPage;
