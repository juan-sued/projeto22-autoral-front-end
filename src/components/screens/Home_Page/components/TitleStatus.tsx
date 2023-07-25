import styled from 'styled-components';
import { useEffect, useState } from 'react';

export default function TitleStatus() {
  const hourCurrent = new Date().getHours();

  const [status, setStatus] = useState<string>('Aberto agora');

  useEffect(() => {
    if (hourCurrent >= 9 && hourCurrent <= 19) {
      setStatus('Aberto agora');
    } else if ((hourCurrent >= 0 && hourCurrent <= 8) || hourCurrent >= 20) {
      setStatus('Fechado agora');
    }
  }, []);

  return (
    <TitleStatusStyle color={status}>
      <p>{status}</p>
      <span></span>
    </TitleStatusStyle>
  );
}

const TitleStatusStyle = styled.div<{ color: string }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 24px;
  animation: fadeTranslateXRight 0.8s forwards;

  p {
    color: ${props =>
      props.color === 'Fechado agora' ? '#9e0002' : '#028c10'};
    font-family: 'Josefin Slab', serif;
    font-size: 32px;
    font-weight: 700;
    margin-left: 20px;
  }

  span {
    position: relative;
    margin-top: -8px;
    width: 103%;
    height: 1px;
    background-color: gray;
    z-index: -1;
  }
`;
