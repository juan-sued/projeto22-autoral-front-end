import styled from 'styled-components';
import LottieAnimation from '../Animations/LottieAnimation';
import animationData from '@/assets/animation-programmer.json';

export default function AuthorMessage() {
  return (
    <AuthorMessageStyle>
      <LottieAnimation animationData={animationData} />

      <div className="developed">Em desenvolvimento por Juan Sued</div>
    </AuthorMessageStyle>
  );
}

const AuthorMessageStyle = styled.div`
  padding: 20px;
  .developed {
    width: 100%;
    text-align: center;
    color: white;
    height: 20%;
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
