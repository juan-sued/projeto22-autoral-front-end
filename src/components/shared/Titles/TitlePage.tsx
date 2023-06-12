import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import arrowright from '@/assets/arrowright.svg';

interface TitlePageProps {
  to?: string;
  title: string;
}

export default function TitlePage({ to = '/', title }: TitlePageProps) {
  const navigate = useNavigate();

  return (
    <TitlePageStyle>
      <Container>
        <BackPage>
          <button onClick={() => navigate(to)}>
            <img src={arrowright} alt="" />
            <p>voltar</p>
          </button>
        </BackPage>
      </Container>

      <TitleContainer>{title}</TitleContainer>
    </TitlePageStyle>
  );
}

const TitlePageStyle = styled.div`
  margin-bottom: 0px;
`;
const Container = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
`;

const BackPage = styled.div`
  button {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    border: none;
    :hover {
      cursor: pointer;
    }

    img {
      transform: rotate(180deg);
      width: 6%;
      max-width: 40px;
    }
    p {
      font-size: 16px;

      width: 100%;
      text-align: start;
      margin-left: 10px;
      font-family: 'Josefin Slab', serif;
    }

    @media screen and (min-width: 413px) {
      p {
        font-size: 30px;
        margin-left: 20px;
      }
    }
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  height: 140px;
`;
