import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  children: ReactNode;
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  toggleModal,
  setToggleModal
}) => {
  return (
    <ModalStyle>
      <div className="cardModal">
        <button
          className="closeCard"
          onClick={() => setToggleModal(!toggleModal)}
        >
          <MdClose color="#686868" size="35px" />
        </button>
        <h1 className="titleModal">Adicionar produto ao estoque</h1>
        {children}
      </div>
    </ModalStyle>
  );
};

const ModalStyle = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3%;

  .cardModal {
    background-color: white;
    width: 100%;
    height: 610px;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    overflow: scroll;

    .titleModal {
      position: relative;
      bottom: 15px;
      font-size: 20px;

      @media screen and (min-width: 413px) {
        font-size: 30px;
      }
    }

    .closeCard {
      background-color: transparent;
      border: none;
      position: relative;
      left: 45%;
      padding-top: 4px;

      :hover {
        cursor: pointer;
        background-color: lightgrey;
        border-radius: 5px;
      }
    }
  }
};
`;
export default Modal;
