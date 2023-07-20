import React from 'react';
import Lottie from 'lottie-react-web';
import styled from 'styled-components';

interface LottieAnimationProps {
  animationData: object; // ou pode ser string se preferir, mas normalmente é um objeto JSON
  loop?: boolean;
  autoplay?: boolean;
  size?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  size = '100%'
}) => {
  return (
    <LottieAnimationStyle size={size}>
      <div className="container">
        <Lottie
          options={{
            animationData: animationData,
            loop: loop,
            autoplay: autoplay
          }}
        />
      </div>
    </LottieAnimationStyle>
  );
};

interface LottieAnimationStyleProps {
  size: string;
}

const LottieAnimationStyle = styled.div<LottieAnimationStyleProps>`
  width: 100%;
  display: grid;
  place-items: center;

  .container {
    width: ${props => props.size};
  }
`;

export default LottieAnimation;
