import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface WellcomeUserProps {
  name: string | null | undefined;
}

const WellcomeUser: React.FC<WellcomeUserProps> = ({ name }) => {
  const hourCurrent = new Date().getHours();

  const [greetingMessage, setGreetingMessage] = useState('Bom dia');

  useEffect(() => {
    if (hourCurrent >= 6 && hourCurrent <= 11) {
      setGreetingMessage('Bom dia');
    } else if (hourCurrent >= 12 && hourCurrent <= 17) {
      setGreetingMessage('Boa tarde');
    } else {
      setGreetingMessage('Boa noite');
    }
  }, []);

  function shortName(): string {
    const nameShorten = name?.split(' ');
    return nameShorten?.[0] ?? '';
  }

  if (name && name !== 'user default') {
    return (
      <ContainerWellcomeUser>
        <span className="container">
          <h1 className="gooday">
            {greetingMessage}, {shortName()}!
          </h1>
          <p>
            {greetingMessage === 'Bom dia'
              ? 'Nada melhor que um Gellato para começar o dia cheio de energia.'
              : greetingMessage === 'Boa tarde'
              ? 'Hmm!!! essa tarde ta pedindo um açaí da Gellato!'
              : 'Nada melhor que um Gellato terminar a noite bem.'}
          </p>
        </span>
      </ContainerWellcomeUser>
    );
  } else {
    return (
      <ContainerWellcomeUser>
        <span className="container">
          <p>
            {greetingMessage === 'Bom dia'
              ? 'Nada melhor que um Gellato para começar o dia cheio de energia.'
              : greetingMessage === 'Boa tarde'
              ? 'Hmm!!! essa tarde ta pedindo um açaí da Gellato!'
              : 'Nada melhor que um Gellato terminar a noite bem.'}
          </p>
        </span>
      </ContainerWellcomeUser>
    );
  }
};

const ContainerWellcomeUser = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;

  .container {
    min-width: 260px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    font-family: 'Josefin Slab', serif;
    font-size: 20px;
    font-weight: 400;
    margin-left: 110px;
    line-height: 29px;

    h1 {
      margin-bottom: 30px;
    }
  }

  @media screen and (min-width: 700px) {
    .container {
      font-size: 40px;
      width: 50%;
      line-height: 67px;
    }
  }
`;

export default WellcomeUser;
