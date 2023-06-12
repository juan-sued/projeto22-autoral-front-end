import React from 'react';
import styled from 'styled-components';

interface TitleSectionRightProps {
  titleSession: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  colorLine?: string;
}

const TitleSectionRight: React.FC<TitleSectionRightProps> = ({
  titleSession,
  color = '#1e0c22c2',
  fontSize = '26px',
  fontWeight,
  colorLine = '#8e1c5ae5'
}) => {
  return (
    <TitleSectionRightContainer
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      colorLine={colorLine}
    >
      <div className="titleContainer">
        <h2>{titleSession}</h2>
        <div className="line"></div>
      </div>
    </TitleSectionRightContainer>
  );
};

interface TitleSectionRightContainerProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  colorLine?: string;
}

const TitleSectionRightContainer = styled.div<TitleSectionRightContainerProps>`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin-bottom: 35px;


  .titleContainer {
    width:auto;
    h2 {
      padding-right: 30px;
      font-size: ${props => props.fontSize};
      color: ${props => props.color};
      font-weight: ${props => props.fontWeight};
    }
    .line {
      background-color: ${props => props.colorLine};
      height: 1px;
      width: 103%;
      position: relative;
      bottom: ${props => (props.fontSize === '26px' ? '7px' : '13px')};
      right: 0;

      @media screen and (min-width: 700px) {
        max-width: 500px;
      }
    }
  }


};
`;
export default TitleSectionRight;
