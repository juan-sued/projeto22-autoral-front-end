import styled from 'styled-components';

export default function PopsicleLoading() {
  return (
    <PopsicleLoadingStyle>
      <div className="loader"></div>
    </PopsicleLoadingStyle>
  );
}

const PopsicleLoadingStyle = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  animation: spin 7s reverse infinite;
  .loader {
    transform: scale(0.4) rotate(320deg);
    height: 150px;
    width: 100px;
    border-radius: 55px 55px 10px 10px;
    position: relative;
    background: #ff3d00;
    background-image: linear-gradient(
      0deg,
      #800080 25%,
      #800080 25%,
      #a000a0 25%,
      #a000a0 50%,
      #800080 50%,
      #800080 50%,
      #800080 75%,
      #900090 75%
    );
    background-position: 0px 0px;
    background-size: auto 175px;
    background-repeat: repeat-y;
    animation: colorShift 6s linear infinite;
  }

  .loader:before {
    content: '';
    position: absolute;
    left: 10px;
    bottom: 15px;
    width: 15px;
    height: 100px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.5);
  }

  .loader:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0);
    box-shadow: 0 15px 2px rgba(0, 0, 0, 0.25) inset;
    width: 32px;
    height: 45px;
    background: #e09c5f;
    border-radius: 0 0 12px 12px;
  }

  @keyframes colorShift {
    to {
      background-position: 0 175px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(300deg);
    }
    40% {
      transform: rotate(-60deg);
    }
    25% {
      transform: rotate(60deg);
    }
    15% {
      transform: rotate(-2deg);
    }
    0% {
      transform: rotate(300deg);
    }
  }
`;
