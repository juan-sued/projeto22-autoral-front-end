import styled from 'styled-components';
import Image_Acai_Fruta from '@/assets/acaifruta2.png';
import Loading from '@/components/shared/Loaders/Loading';

interface CardOfertProps {
  objHomeResponseAPI: {
    listMyFavoriteds: {
      image: string;
    }[];
  };
}

export default function CardOfert({ objHomeResponseAPI }: CardOfertProps) {
  return (
    <CardOfertContainer>
      <div className="cardOfert">
        <div className="pointGold one"></div>
        <div className="pointGold two"></div>
        <div className="pointGold three"></div>
        <div className="containerInter">
          <h2 className="titleCardOfert">Oferta do dia</h2>
          <div className="purplecircle">
            {objHomeResponseAPI.listMyFavoriteds.length > 0 ? (
              <img src={objHomeResponseAPI.listMyFavoriteds[0].image} alt="" />
            ) : (
              <Loading width={'40'} />
            )}
          </div>
        </div>

        <ImageAcaiFruta src={Image_Acai_Fruta} alt="" />
      </div>
    </CardOfertContainer>
  );
}

const ImageAcaiFruta = styled.img`
  width: 70px;
  position: relative;
  bottom: 260px;
  left: 120px;
`;

const CardOfertContainer = styled.div`
  width: 100%;
  height: 245px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 20px;
  margin-top: 60px;
  .cardOfert {
    width: 175px;
    height: 220px;
    background-color: #1e0c22;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: solid 8px #bc984d;
    margin-right: 20px;
    border-width: 0px 5px 5px 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .containerInter {
      display: flex;

      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 180px;
      position: relative;
      bottom: 20px;
    }
    .titleCardOfert {
      color: white;
      font-family: 'Estonia', cursive;
      font-size: 35px;
    }

    .purplecircle {
      min-height: 123px;
      width: 133px;
      background-color: #8e1c5a;
      border-radius: 1000px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        position: relative;
        max-width: 100%;
        width: fit-content;
        border-radius: 100px;
        transform: rotate(3deg);
      }
    }

    .pointGold {
      width: 10px;
      min-height: 10px;
      background-color: #bc984d;
      border-radius: 100px;
      position: relative;
    }
    .one {
      left: 140px;
      top: 186px;
    }

    .two {
      bottom: 10px;
    }

    .three {
      top: 165px;
    }
  }
}`;
