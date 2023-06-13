import styled from 'styled-components';
import Image_Acai_Fruta from '@/assets/acaifruta2.png';
import Loading from '@/components/shared/Loaders/Loading';
import ButtonSubmitHover from '@/components/shared/Buttons/ButtonSubmitHover';
import ButtonPlant from '@/components/shared/Buttons/ButtonPlant';

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
      <div className="book">
        <div className="contentBook">
          <h1>
            Você <strong>merece</strong> essa oferta.
          </h1>
          <ButtonPlant />
        </div>
        <div className="cardOfert cover">
          <div className="pointGold one"></div>
          <div className="pointGold two"></div>
          <div className="pointGold three"></div>
          <div className="containerInter">
            <h2 className="titleCardOfert">Oferta do dia</h2>
            <div className="purplecircle">
              {objHomeResponseAPI.listMyFavoriteds.length > 0 ? (
                <img
                  src={objHomeResponseAPI.listMyFavoriteds[0].image}
                  alt=""
                />
              ) : (
                <Loading width={'40'} />
              )}
            </div>
          </div>

          <ImageAcaiFruta src={Image_Acai_Fruta} alt="" />
        </div>
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
  padding-right: 50px;
  margin-top: 60px;

  .cardOfert {
    width: 175px;
    height: 220px;
    background-color: #3f1948;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: solid 8px #bc984d;
    margin-right: 20px;
    border-width: 0px 5px 5px 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

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
      background-color: #bc984d;
      border-radius: 1000px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

  .book {
    position: relative;
    border-radius: 10px;
    width: 160px;
    height: 220px;
    background-color: whitesmoke;
    box-shadow: 1px 1px 12px #000;
    transform: preserve-3d;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: end;
    color: #000;
    transition: all 0.5s;
    padding: 10px 10px 0px 10px;

    .contentBook {
      height: 100%;
      width: 95px;
      display: grid;
      place-items: center;
      align-items: space-between;

      strong {
        font-weight: 800;
      }

      h1 {
        color: rgb(0, 0, 0, 0.8);
        font-size: 27px;
        font-weight: 500;
      }
    }
  }

  .cover {
    top: 0;
    left: 0px;

    position: absolute;
    width: 175px;
    height: 220px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
    transform-origin: 0;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;

    transform: rotateY(-70deg) translateX(-40px);
  }
  .book:hover {
    transform: translateX(30px);
  }
  p {
    font-size: 20px;
    font-weight: bolder;
  }
`;
