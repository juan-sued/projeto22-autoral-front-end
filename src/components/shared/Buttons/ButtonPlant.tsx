import styled from 'styled-components';
import buttonPlant1 from '@/assets/buttonplant1.svg';
import buttonPlant2 from '@/assets/buttonplant2.svg';
import buttonPlant3 from '@/assets/buttonplant3.svg';
import { useNavigate } from 'react-router-dom';

interface ButtonPlantProps {
  title: string;
  to: string;
}

const ButtonPlant: React.FC<ButtonPlantProps> = ({ title, to }) => {
  const navigate = useNavigate();
  return (
    <ButtonPlantStyle onClick={() => navigate(to)}>
      <button>
        {title}
        <div className="icon-1">
          <img src={buttonPlant1} alt="" />
        </div>
        <div className="icon-2">
          <img src={buttonPlant2} alt="" />
        </div>
        <div className="icon-3">
          <img src={buttonPlant3} alt="" />
        </div>
      </button>
    </ButtonPlantStyle>
  );
};

export default ButtonPlant;

const ButtonPlantStyle = styled.div`
  width: 100%;
  max-width: 400px;
  button {
    position: relative;
    background: #fec195;
    font-size: 17px;
    font-weight: 500;
    color: #181818;
    border: 1px solid #fec195;
    border-radius: 10px;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
    transform: scale(1);
    width: 100%;
    height: 50px;
  }

  button:hover {
    border: 1px solid #f3b182;
    background: linear-gradient(
      85deg,
      #fec195,
      #fcc196,
      #fabd92,
      #fac097,
      #fac39c
    );
    animation: wind 2s ease-in-out infinite;
    cursor: pointer;
  }

  @keyframes wind {
    0% {
      background-position: 0% 50%;
    }

    0% {
      background-position: 50% 100%;
    }

    0% {
      background-position: 0% 50%;
    }
  }

  .icon-1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    transform-origin: 0 0;
    transform: rotate(10deg);
    transition: all 0.5s ease-in-out;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  }

  button:hover .icon-1 {
    animation: slay-1 3s cubic-bezier(0.52, 0, 0.58, 1) infinite;
    transform: rotate(10deg);
  }

  @keyframes slay-1 {
    0% {
      transform: rotate(10deg);
    }

    50% {
      transform: rotate(-5deg);
    }

    100% {
      transform: rotate(10deg);
    }
  }

  .icon-2 {
    position: absolute;
    top: 0;
    left: 25px;
    width: 12px;
    transform-origin: 50% 0;
    transform: rotate(10deg);
    transition: all 1s ease-in-out;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  }

  button:hover .icon-2 {
    animation: slay-2 3s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
    transform: rotate(0);
  }

  @keyframes slay-2 {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(15deg);
    }

    100% {
      transform: rotate(0);
    }
  }

  .icon-3 {
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    transform-origin: 50% 0;
    transform: rotate(-5deg);
    transition: all 1s ease-in-out;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  }

  button:hover .icon-3 {
    animation: slay-3 2s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
    transform: rotate(0);
  }

  @keyframes slay-3 {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(-5deg);
    }

    100% {
      transform: rotate(0);
    }
  }
`;
