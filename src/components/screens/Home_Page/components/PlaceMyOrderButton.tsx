import styled from 'styled-components';
import placeorder from '../../../../assets/placeorder.gif';

import clickhere from '../../../../assets/click.gif';

export default function PlaceMyOrderButton() {
  return (
    <PlaceMyOrderContainer>
      <button className="placeMyOrderButton">
        <div className="degrade">
          <p>Fazer meu pedido</p>
          <img src={clickhere} alt="" />
        </div>
      </button>
    </PlaceMyOrderContainer>
  );
}

const PlaceMyOrderContainer = styled.div`
  height: 192px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 340px;
    height: 180px;
    padding: 0px;

    background-image: url(${placeorder});
    background-size: cover;
    border: none;
    font-size: 20.976px;
    color: #1c2156;
    font-family: 'Josefin Slab', serif;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  .degrade {
    position: relative;
    min-width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.37);
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 150px;

    p {
      font-weight: 600;
      font-size: 40px;
      color: white;
    }

    img {
      position: relative;
      width: 140px;
    }
  }
};
`;
