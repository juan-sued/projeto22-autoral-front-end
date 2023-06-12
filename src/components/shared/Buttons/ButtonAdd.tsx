import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

interface ButtonAddProps {
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({
  toggleModal,
  setToggleModal
}) => {
  return (
    <ButtonAddInStyle
      functionToggle={toggleModal}
      onClick={() => setToggleModal(!toggleModal)}
    >
      <MdAdd color="white" size="35px" />
    </ButtonAddInStyle>
  );
};

interface ButtonAddInStyleProps {
  functionToggle: boolean;
}
const ButtonAddInStyle = styled.button<ButtonAddInStyleProps>`
  position: fixed;
  z-index: 1000;
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

  transform: rotate(${props => (props.functionToggle ? '45' : '0')}deg);
  :hover {
    cursor: pointer;
    transition: all 300ms ease;
    transform: scale(1.1)
      rotate(${props => (props.functionToggle ? '45' : '0')}deg);
  }
`;

export default ButtonAdd;
