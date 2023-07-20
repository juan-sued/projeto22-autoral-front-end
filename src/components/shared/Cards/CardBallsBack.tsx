import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

interface CardBallsBackProps {
  colorBalls: string;
  content: string;
}
export default function CardBallsBack({
  colorBalls,
  content
}: CardBallsBackProps) {
  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });
  return (
    <CardBallsBackStyle colorBalls={colorBalls} inView={inView} ref={ref}>
      <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">{content}</div>
      </div>
    </CardBallsBackStyle>
  );
}

interface CardBallsBackStyleProps {
  colorBalls: string;
  inView: boolean;
}

const CardBallsBackStyle = styled.div<CardBallsBackStyleProps>`
  opacity: 0;
  ${props =>
    props.inView
      ? `animation: fadeTranslate 1s ease-in-out;animation-fill-mode: forwards;`
      : ''}
  .card {
    width: 190px;
    height: 254px;
    transition: all 0.2s;
    position: relative;
    cursor: pointer;
  }

  .card-inner {
    width: inherit;
    height: inherit;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-size: 120px;
  }

  .card:hover {
    transform: scale(1.04) rotate(1deg);
  }

  .circle {
    width: 50px;
    height: 50px;
    background: radial-gradient(
      ${props => props.colorBalls},
      ${props => props.colorBalls}
    );
    border-radius: 50%;
    position: absolute;
    animation: move-up6 2s ease-in infinite alternate-reverse;
  }

  .circle:nth-child(1) {
    top: -13px;
    left: -13px;
  }

  .circle:nth-child(2) {
    bottom: -13px;
    right: -13px;
    animation-name: move-down1;
  }

  @keyframes move-up6 {
    to {
      transform: translateY(-10px);
    }
  }

  @keyframes move-down1 {
    to {
      transform: translateY(10px);
    }
  }
`;
