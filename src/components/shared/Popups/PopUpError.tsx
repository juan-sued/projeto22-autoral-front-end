import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import PopUp from './PopUp';

interface PopUpErrorProps {
  children: React.ReactNode;
  title: string;
}

export default function PopUpError({ children, title }: PopUpErrorProps) {
  const { setErrorResponse, signOut } = useAuth();
  const [toggleClosePopUp, setToggleClosePopUp] = useState(true);

  function closePopUp() {
    setToggleClosePopUp(!toggleClosePopUp);
    setErrorResponse(200);
  }

  return (
    <PopUp title={title}>
      <ContentPopUpStyle>
        <div className="contentText">{children}</div>

        <div className="contentPopUpButtons">
          <button className="close" onClick={closePopUp}>
            Fechar
          </button>
          <button className="login" onClick={signOut}>
            Login
          </button>
        </div>
      </ContentPopUpStyle>
    </PopUp>
  );
}
interface ContentPopUpStyle {}

const ContentPopUpStyle = styled.div<ContentPopUpStyle>`
  width: 100%;
  height: 100%;

  .contentText {
    display: grid;
    height: 150px;
    place-content: center;

    p {
      text-align: center;
      font-size: 17px;
    }
  }

  .contentPopUpButtons {
    display: flex;
    gap: 20px;
    justify-content: space-around;
    button {
      width: 100%;
      max-width: 250px;
    }
  }
`;
