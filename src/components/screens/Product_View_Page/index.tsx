import Main from '@/components/shared/Main';
import TitlePage from '@/components/shared/Titles/TitlePage';
import styled from 'styled-components';
import imageDefault from '@/assets/copoHome.jpg';
import { TbShoppingCartPlus } from 'react-icons/tb';
export default function ProductViewPage() {
  return (
    <ProductViewPageStyle backgroundImage={imageDefault}>
      <TitlePage title="Açaí da Alê" />
      <Main margin_top="0">
        <div className="contentProductView">
          <div className="containerButtonsHeader">
            <div className="glassEffect">R$ 25,50</div>
            <div className="glassEffect">
              <TbShoppingCartPlus size={25} />
            </div>
          </div>

          <div className="containerButton">
            <button className="glassEffect Details">Ver detalhes</button>
          </div>
        </div>

        <div className="contentStockView">stocks do produto</div>
      </Main>
    </ProductViewPageStyle>
  );
}
interface ProductViewPageStyleProps {
  backgroundImage: string;
}

const ProductViewPageStyle = styled.div<ProductViewPageStyleProps>`
  .contentProductView {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.85)),
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

    .containerButtonsHeader {
      display: flex;
      justify-content: space-between;
    }

    .material-icons-round {
      font-size: 10px;
    }

    .glassEffect {
      padding: 20px;
      width: fit-content;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      font-weight: 700;
      font-size: 18px;
      display: grid;
      place-items: center;
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
  }

  .contentStockView {
    background-color: purple;
    height: 1000px;
  }
`;
