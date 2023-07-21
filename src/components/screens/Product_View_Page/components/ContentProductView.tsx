import { TbShoppingCartPlus } from 'react-icons/tb';
import styled from 'styled-components';
import imageDefault from '@/assets/copoHome.jpg';
import { useCart } from '@/hooks/useCart';
interface ContentProductViewProps {
  image: string;
  priceFormatted: string;
  handleScroll: () => void;
}

const ContentProductView: React.FC<ContentProductViewProps> = ({
  image,
  priceFormatted,
  handleScroll
}) => {
  const {} = useCart();
  return (
    <ContentProductViewStyle
      backgroundImage={image.includes('https://') ? image : imageDefault}
    >
      <div className="containerButtonsHeader">
        <div className="glassEffect">{priceFormatted}</div>
        <div className="glassEffect">
          <TbShoppingCartPlus size={25} />
        </div>
      </div>

      <div className="containerButton">
        <button className="glassEffect Details" onClick={handleScroll}>
          Ver detalhes
        </button>
      </div>
    </ContentProductViewStyle>
  );
};

interface ContentProductViewStyleProps {
  backgroundImage: string;
}

const ContentProductViewStyle = styled.div<ContentProductViewStyleProps>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: 90%;
  max-width: 600px;
  height: 400px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadeTranslate 0.5s ease-in-out;
  animation-fill-mode: forwards;
  margin-top: 50px;
  .glassEffect {
    padding: 20px;
    width: fit-content;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-weight: 700;
    font-size: 18px;
    display: grid;
    place-items: center;
    transition: all 0.2s ease-in-out;
    animation: fadeTranslate 0.5s ease-in-out;
    animation-fill-mode: forwards;
    :hover {
      cursor: pointer;
      transform: scale(1.06);
    }
  }
  .containerButtonsHeader {
    display: flex;
    justify-content: space-between;
  }

  .material-icons-round {
    font-size: 10px;
  }

  .containerButton {
    display: grid;
    place-items: center;

    button {
      color: white;
      width: 100%;

      font-weight: 400;
    }
  }
`;
export default ContentProductView;
