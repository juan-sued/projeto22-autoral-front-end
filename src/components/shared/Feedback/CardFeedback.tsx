import styled from 'styled-components';
import iconprofile from '../../../assets/iconprofile.svg';
import iconstart from '../../../assets/iconstart.svg';
import iconmiddlestart from '../../../assets/iconmiddlestart.svg';
import iconnotpoint from '../../../assets/iconnotpoint.svg';
import * as utils from '../../../util/utilsFunctions';
import { useState } from 'react';

interface CardFeedbackProps {
  name: string;
  stars: string;
  feedback: string;
}

export default function CardFeedback({
  name,
  stars,
  feedback
}: CardFeedbackProps) {
  const [stateCardFeedback, setStateCardFeedback] = useState(false);

  return (
    <Container>
      <CardFeedbackStyle
        onClick={() =>
          utils.increaseCardSizeToggle(setStateCardFeedback, stateCardFeedback)
        }
        stateCardFeedback={stateCardFeedback}
      >
        <div className="columnIcon">
          <div className="iconBackground">
            <img src={iconprofile} alt="" />
          </div>
        </div>
        <div className="columnContent">
          <h1>{name}</h1>
          <span className="lineDetailsFeedback">
            <p className="stars">{stars}</p>
            {utils.incrementStarsFeedback(stars).map((star, index) => (
              <img
                key={index}
                src={
                  star === 'startFull'
                    ? iconstart
                    : star === 'middle'
                    ? iconmiddlestart
                    : iconnotpoint
                }
                alt=""
              />
            ))}

            <p className="date">12/01/2022</p>
          </span>
          <div className="feedback">{feedback}</div>
        </div>
      </CardFeedbackStyle>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

interface CardFeedbackStyleProps {
  stateCardFeedback: boolean;
}

const CardFeedbackStyle = styled.div<CardFeedbackStyleProps>`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  max-width: 100%;
  padding: 15px 10px 15px 10px;
  font-weight: 500;
  margin-bottom: 20px;
  transition: height 2s ease-out;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
  height: ${props => (props.stateCardFeedback ? '100%' : '40%')};
  overflow: hidden;
  width: 100%;

  :hover {
    cursor: pointer;
    transition: all 0.5s ease-out;
    box-shadow: none;
  }

  .feedback {
    width: 275px;
    word-wrap: break-word;
    line-height: 21px;
    font-weight: 500;
    font-size: 17px;
    white-space: ${props => (props.stateCardFeedback ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lineDetailsFeedback {
    display: flex;
    justify-content: flex-start;

    display: flex;
    margin-bottom: 10px;
    align-items: center;

    height: 20px;

    .stars {
      font-weight: 700;
      margin-right: 8px;
    }
    .date {
      color: #b0b0b0;
      margin-left: 8px;
    }

    img {
      width: 14px;
      height: 14px;
      margin-right: 1px;
      margin-bottom: 4px;
    }
  }

  .columnContent {
    h1 {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 19px;
    }
  }

  .columnIcon {
    width: 50px;

    .iconBackground {
      background-color: #f2f2f2;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      img {
        width: 50%;
      }
    }
  }
`;
