import React from 'react';
import styled from 'styled-components';

interface TitleSectionMidProps {
  titleSection: string;
}

const TitleSectionMid: React.FC<TitleSectionMidProps> = ({ titleSection }) => {
  return <TitleSectionMidContainer>{titleSection}</TitleSectionMidContainer>;
};

interface TitleSectionMidContainerProps {}

const TitleSectionMidContainer = styled.div<TitleSectionMidContainerProps>`
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 20px;
`;
export default TitleSectionMid;
