import styled from 'styled-components';

export const ContainerFormClass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 15%;

  @media screen and (min-width: 413px) {
    margin-top: 100px;
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 200px;
  }
`;

export const InputClass = styled.input`
  font-size: 20px;
  width: 100%;
  height: 50px;

  border: 1px solid #d4d4d4;
  font-family: 'Jost', sans-serif;
  border-radius: 4px;
  padding-left: 10px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: #000000;
  ::placeholder {
    color: #0004;
  }
`;
