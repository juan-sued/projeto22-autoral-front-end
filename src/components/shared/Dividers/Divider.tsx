import React from 'react';
import styled from 'styled-components';
import divider from '@/assets/divider.svg';

const Divider: React.FC = () => {
  return (
    <DividerStyle>
      <img src={divider} alt="" />
    </DividerStyle>
  );
};

const DividerStyle = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Divider;
