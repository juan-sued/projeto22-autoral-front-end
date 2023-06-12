import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

interface LoadingProps {
  height?: string;
  width?: string;
  marginLeft?: string;
  marginTop?: string;
}

const Loading: React.FC<LoadingProps> = ({
  height = '50%',
  width = '50',
  marginLeft = '0',
  marginTop = '0'
}) => {
  return (
    <ContainerLoading marginLeft={marginLeft} marginTop={marginTop}>
      <ThreeDots
        color="rgba(255, 255, 255, 0.5"
        height={height}
        width={width}
      />
    </ContainerLoading>
  );
};

const ContainerLoading = styled.div<{
  marginLeft?: string;
  marginTop?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
`;
export default Loading;
