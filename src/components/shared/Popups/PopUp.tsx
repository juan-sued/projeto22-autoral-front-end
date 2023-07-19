import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

interface PopUpProps {
  children: React.ReactNode;
  title: string;
}

export default function PopUp({ children, title }: PopUpProps) {
  const { setErrorResponse } = useAuth();
  const [toggleClosePopUp, setToggleClosePopUp] = useState(true);

  function closePopUp() {
    setToggleClosePopUp(!toggleClosePopUp);
    setErrorResponse(200);
  }

  return (
    <PopUpStyle close={toggleClosePopUp}>
      <div className="PopUpContainer">
        <div className="closePopUpContainer">
          <div className="titlePopUpContainer">
            <h1 className="titlePopUp">{title}</h1>
          </div>
          <button className="closePopUp" onClick={closePopUp}>
            <IoClose />
          </button>
        </div>
        <div className="contentPopUp">{children}</div>
      </div>
    </PopUpStyle>
  );
}
interface PopUpStyleProps {
  close: boolean;
}

const PopUpStyle = styled.div<PopUpStyleProps>`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;

  place-items: center;
  display: ${props => (props.close ? 'grid' : 'none')};

  button {
    border: none;
    border-radius: 4px;
    display: grid;
    place-items: center;
    padding: 10px;
    transition: all 0.2s ease-in;

    :hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 15px;
    }

    :active {
      box-shadow: inset rgba(0, 0, 0, 0.2) 0px 5px 15px;
    }
  }

  .PopUpContainer {
    background-color: white;
    width: 90vw;
    min-height: 200px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-width: 700px;
    padding: 15px;
    animation: fadeSmallBig normal 0.5s;
    .closePopUpContainer {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .closePopUp {
        max-width: 33px;
        max-height: 33px;
        :hover {
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 15px;
        }

        :active {
          box-shadow: inset rgba(0, 0, 0, 0.2) 0px 5px 15px;
        }
      }
    }

    .titlePopUpContainer {
      width: 100%;
      display: grid;
      place-items: center;
      h1 {
        max-width: 200px;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .contentPopUp {
      width: 100%;
      height: 100%;
    }
  }
`;
