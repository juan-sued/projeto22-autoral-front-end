import React from 'react';
import styled from 'styled-components';

interface MainProps {
  children: React.ReactNode;
  margin_top: string;
}

const Main: React.FC<MainProps> = ({ children, margin_top }) => {
  return <MainStyle margin_top={margin_top}>{children}</MainStyle>;
};

const MainStyle = styled.main<{ margin_top: string }>`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.margin_top}px;
  position: absolute;
  z-index: 1;
  width: 100%;
`;

export default Main;
