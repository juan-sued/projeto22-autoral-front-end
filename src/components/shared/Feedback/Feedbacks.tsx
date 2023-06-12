import styled from 'styled-components';
import CardFeedback from './CardFeedback';
import TitleAndArrow from '../Titles/TitleAndArrow';

interface Feedback {
  name: string;
  stars: string;
  feedback: string;
}

interface FeedBacksProps {
  titleSession: string;
}

export default function FeedBacks({ titleSession }: FeedBacksProps) {
  const arrayFeedbacks: Feedback[] = [
    {
      name: 'Alessandra Meireles',
      stars: '1,0',
      feedback:
        'Açaí muito bom, dei um só pra ver como fica só com uma estrelinha'
    },
    {
      name: 'Ronaldinho Fenômeno',
      stars: '5,0',
      feedback:
        'A RAZÃO DE EU TER SAÍDO DE CAMPO!! aaaaaaaaaaaaaaaaaaa FEEEDBACK MUITO GRANDE PARA TESTAR A ANIMAÇÃO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    },
    {
      name: 'Rogério Siena',
      stars: '3,0',
      feedback: 'Melhor que agarrar pro São Paulo, mas dei 3 pq sou calvo'
    },
    {
      name: 'Silvio Santos',
      stars: '2,5',
      feedback:
        ' MAOOOEEEH Colocaria mais calda de petróleo da próxima vez MAAAOOEEH O AVIÃOZINHO'
    }
  ];

  return (
    <Container>
      <TitleAndArrow titleSession={titleSession} />
      <FeedBacksContainer>
        {arrayFeedbacks.map((feedback, index) => (
          <CardFeedback
            key={index}
            name={feedback.name}
            stars={feedback.stars}
            feedback={feedback.feedback}
          />
        ))}
      </FeedBacksContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 70px;
  width: 100%;
`;

const FeedBacksContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 10px;
`;
