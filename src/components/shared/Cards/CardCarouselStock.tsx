import styled from 'styled-components';
import { BsCheckCircleFill } from 'react-icons/bs';
import { formatPrice } from '@/util/format';
import { useInView } from 'react-intersection-observer';
import imageCup from '@/assets/copoHome.jpg';
import { IStock } from '@/util/requests/products/stockRequests';
interface CardCarouselStockProps
  extends Omit<IStock, 'category' | 'description' | 'amount' | 'categoryId'> {
  incrementStock: (value: number) => number[];
  showPrice: boolean;
  isSelected: boolean;
  index: number;
}

export default function CardCarouselStock({
  image,
  price,
  quantity_for_unity,
  unit_of_measure,
  id,
  incrementStock,
  title,
  showPrice,
  isSelected = false,
  index
}: CardCarouselStockProps) {
  let scaleImage = 0.5;
  const quantityForUnityNumber = Number(quantity_for_unity);
  switch (quantityForUnityNumber) {
    case 1000:
      scaleImage = 0.7;
      break;
    case 700:
      scaleImage = 0.6;
      break;
    case 500:
      scaleImage = 0.5;
      break;
    case 400:
      scaleImage = 0.4;
      break;
    case 300:
      scaleImage = 0.38;
      break;
    default:
      scaleImage = 0.7;
      break;
  }

  const textShowUnity = '( ' + quantityForUnityNumber + ' Un)';

  const showUnity =
    quantityForUnityNumber > 1 && quantityForUnityNumber < 300
      ? textShowUnity
      : '';
  const priceFormatted = formatPrice(Number(price));

  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });
  const delay = index / 10 + 0.5;
  return (
    <CardOfStock
      ref={ref}
      inView={inView}
      delay={delay}
      scaleImage={scaleImage}
      isSelected={isSelected}
      onClick={() => incrementStock(id)}
    >
      <div className="halfCircle">
        <img src={image.includes('https://') ? image : imageCup} alt="" />
      </div>
      <div className="containerTitle">
        <h1 className="title">
          {unit_of_measure === 'unity'
            ? title
            : quantityForUnityNumber + unit_of_measure}
        </h1>
        <p className="description">{showUnity}</p>
      </div>

      <div className="priceStockContainer">
        <p className="priceStock">{showPrice ? priceFormatted : ''}</p>
        <BsCheckCircleFill
          size={16}
          className="iconCheck"
          color={isSelected ? '#7fff7f' : 'transparent'}
        />
      </div>
    </CardOfStock>
  );
}

interface CardOfStockProps {
  scaleImage: number;
  isSelected: boolean;
  inView: boolean;
  delay: number;
}

const CardOfStock = styled.div<CardOfStockProps>`
  height: 250px;
  width: 175px;
  min-width: 175px;
  background-color: #8e1c5a;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 19px 15px 19px;
  color: ${props => (props.isSelected ? '#7fff7f' : 'white')};
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
  border: 3px solid ${props => (props.isSelected ? '#7fff7f' : 'transparent')};
  opacity: 0;
  ${props =>
    props.inView
      ? ` animation: fadeTranslate ${props.delay}s ease-in-out;animation-fill-mode: forwards;`
      : ''}

  .containerTitle {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 25px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 10px;
      width: 100%;

      white-space: nowrap; /* Impede que o texto quebre em várias linhas */
      overflow: hidden; /* Oculta o conteúdo que excede o tamanho do contêiner */
      text-overflow: ellipsis;
    }
  }

  .priceStockContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    bottom: 0px;

    p {
      font-size: 20px;
      font-weight: 600;
    }
    .iconCheck {
      position: relative;
      left: 12px;
      top: 9px;
    }
  }

  .halfCircle {
    position: relative;
    margin-top: -60px;
    min-height: 130px;

    max-height: 130px;
    width: 130px;
    background-color: #eeedf4;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 167px;
      transform: scale(${props => (props.isSelected ? '1' : props.scaleImage)})
        translateY(${props => (props.isSelected ? '-50px' : '0')});
      transition: transform 0.2s ease-in-out;
      border-radius: 100px;
    }
  }

  @keyframes fadeTranslate {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(-5px);
    }
  }
`;
