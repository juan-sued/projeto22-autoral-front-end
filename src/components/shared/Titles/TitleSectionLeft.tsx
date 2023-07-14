import React from 'react';
import styled from 'styled-components';

interface TitleSectionLeftProps {
  titleSection: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  colorLine?: string;
}

const TitleSectionLeft: React.FC<TitleSectionLeftProps> = ({
  titleSection,
  color = '#1e0c22c2',
  fontSize = '30px',
  fontWeight = '600',
  colorLine = '#8e1c5ae5'
}) => {
  return (
    <TitleSectionLeftContainer
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      colorLine={colorLine}
    >
      <div className="titleContainer">
        <h2>{titleSection}</h2>
        <div className="line"></div>
      </div>
    </TitleSectionLeftContainer>
  );
};

interface TitleSectionLeftContainerProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  colorLine?: string;
}

const TitleSectionLeftContainer = styled.div<TitleSectionLeftContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  min-width: 100%;
  margin-bottom: 35px;
  margin-top: 50px;

  margin-left: -5px;

  .titleContainer {
    width: auto;
    h2 {
      padding-left: 30px;
      font-size: ${props => props.fontSize};
      color: ${props => props.color};
      font-weight: ${props => props.fontWeight};
    }
    .line {
      background-color: ${props => props.colorLine};
      height: 1px;
      width: 103%;
      position: relative;
      bottom: ${props => (props.fontSize === '30px' ? '8px' : '13px')};
      left: 0;

      @media screen and (min-width: 700px) {
        max-width: 500px;
      }
    }
  }
`;
export default TitleSectionLeft;
