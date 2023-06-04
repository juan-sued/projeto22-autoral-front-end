import styled from 'styled-components';

export const ImageBoxIceCream = styled.img`
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  margin-bottom: 10px;
  position: fixed;
  z-index: 0;
  bottom: 0;
  right: 0;
  margin-bottom: 0;
`;

export const Logo = styled.img`
  min-width: 145px;
  width: 20%;
  max-width: 200px;
`;
export const ContainerFormClass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 60px;
  z-index: 1;

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 310px;
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
