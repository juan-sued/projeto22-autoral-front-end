import styled from 'styled-components';
import { BsChevronCompactDown } from 'react-icons/bs';

import SectionTotal from './SectionTotal';
import SectionCards from './SectionCards';

interface CheckoutPopUpProps {
  togglePopUpState: boolean;
  closePopUp: () => void;
}

export default function CheckoutPopUp({
  togglePopUpState,
  closePopUp
}: CheckoutPopUpProps) {
  return (
    <CheckoutPopUpStyle togglePopUpState={togglePopUpState}>
      <div className="popUpCard">
        <div className="containerClose" onClick={closePopUp}>
          <BsChevronCompactDown size={50} color="purple" className="icon" />
        </div>
        <div className="containerContent">
          <SectionCards />
          <SectionTotal />
        </div>
      </div>
    </CheckoutPopUpStyle>
  );
}

interface CheckoutPopUpStyleProps {
  togglePopUpState: boolean;
}

const CheckoutPopUpStyle = styled.section<CheckoutPopUpStyleProps>`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: grid;
  place-items: end;
  opacity: ${props => (props.togglePopUpState ? 1 : 0)};
  pointer-events: ${props => (props.togglePopUpState ? 'auto' : 'none')};
  transition: all 0.5s ease-in-out;

  .icon {
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .popUpCard {
    background-color: white;
    border-radius: 100px 100px 0 0;
    padding: 20px;
    height: 600px;
    width: 100%;
    transform: translateY(${props => (props.togglePopUpState ? '0' : '100%')});
    opacity: ${props => (props.togglePopUpState ? 1 : 0)};
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;

    .containerContent {
      display: flex;
      justify-content: start;
      align-items: end;
      width: 100%;

      height: 100%;
      overflow: scroll;

      @media screen and (max-width: 720px) {
        flex-direction: column;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }

    .containerClose {
      display: grid;
      place-items: center;
      width: 100%;
      min-height: auto;
      cursor: pointer;
    }
  }
`;
