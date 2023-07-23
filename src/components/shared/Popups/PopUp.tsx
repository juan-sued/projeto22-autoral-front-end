import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PopUpProps {
  children: React.ReactNode;
  title: string;
  buttonTitle?: string;
  to?: any;
  buttonClose?: boolean;
  buttonBack?: boolean;
}

export default function PopUp({
  children,
  title,
  buttonClose = true,
  buttonBack = false,
  to = buttonBack ? -1 : '',
  buttonTitle = buttonBack ? 'Voltar' : ''
}: PopUpProps) {
  const navigate = useNavigate();
  const { setErrorResponse } = useAuth();
  const [togglePopUp, setTogglePopUp] = useState<boolean>(true);
  function closePopUp() {
    () => setTogglePopUp(state => !state);
    if (to) navigate(to);
    setErrorResponse(200);
  }

  if (buttonClose) {
    return (
      <PopUpStyle close={togglePopUp}>
        <div className="PopUpContainer">
          <div className="closePopUpContainer">
            <div className="titlePopUpContainer">
              <h1 className="titlePopUp">{title}</h1>
            </div>

            <button className="closePopUp" onClick={closePopUp}>
              <IoClose />
            </button>
          </div>
          <div className="contentPopUp">
            {children}
            <button onClick={closePopUp}>{buttonTitle}</button>
          </div>
        </div>
      </PopUpStyle>
    );
  } else {
    return (
      <PopUpStyle close={togglePopUp}>
        <div className="PopUpContainer">
          <div className="titlePopUpContainer">
            <h1 className="titlePopUp">{title}</h1>
          </div>

          <div className="contentPopUp">
            {children}
            <button onClick={closePopUp}>{buttonTitle}</button>
          </div>
        </div>
      </PopUpStyle>
    );
  }
}

interface PopUpStyleProps {
  close: boolean;
}

const PopUpStyle = styled.div<PopUpStyleProps>`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
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
    font-size: 16px;
    width: 100%;
    max-width: 200px;

    :hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
    }

    :active {
      box-shadow: inset rgba(0, 0, 0, 0.2) 0px 5px 15px;
    }
  }

  .PopUpContainer {
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px 20px 0 20px;
    width: auto;
    max-width: 90vw;
    animation: fadeSmallBig normal 0.5s;
    gap: 20px;
    display: grid;

    .closePopUpContainer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .closePopUp {
        width: 33px;
        height: 33px;
        padding: 9px;

        :hover {
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
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
      padding: 20px;
      display: grid;
      place-items: center;
      font-size: 20px;
      gap: 30px;
      text-align: center;
    }
  }
`;
