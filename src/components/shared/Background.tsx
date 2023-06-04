import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  children: ReactNode;
  backgroundColor: string;
  colorGradient: string;
  percentBackground: string;
  backgroundColorGrand: string;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  backgroundColor,
  colorGradient,
  percentBackground,
  backgroundColorGrand
}) => {
  return (
    <BackgroundStyle
      backgroundColor={backgroundColor}
      colorGradient={colorGradient}
      percentBackground={percentBackground}
      backgroundColorGrand={backgroundColorGrand}
    >
      {children}
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.main<BackgroundProps>`
  background-color: ${props => props.colorGradient};
  background-image: linear-gradient(
    0deg,
    ${props => props.colorGradient} 0%,
    ${props => props.backgroundColor} ${props => props.percentBackground}%
  );

  padding: 0;
  margin: 0;
  position: absolute;
  min-height: 100%;
  width: 100%;

  @media screen and (min-width: 450px) {
    background-color: ${props => props.colorGradient};
    background-image: linear-gradient(
      0deg,
      ${props => props.colorGradient} 0%,
      ${props => props.backgroundColorGrand}
        ${props => props.percentBackground}%
    );
  }
};

`;
export default Background;
