import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

interface ButtonAddProps {
  functionToggle: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ functionToggle }) => {
  return (
    <ButtonAddInStyle onClick={functionToggle}>
      <MdAdd color="white" size="35px" />
    </ButtonAddInStyle>
  );
};

const ButtonAddInStyle = styled.button`
  position: fixed;
  height: 80px;
  width: 80px;
  right: 20px;
  bottom: 20px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);

  background-color: purple;
  border: none;
  :hover {
    cursor: pointer;

    background-color: #934c93;
  }
`;

export default ButtonAdd;
