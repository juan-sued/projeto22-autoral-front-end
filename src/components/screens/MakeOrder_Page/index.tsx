import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { formatPrice } from '@/util/format';
import { calculateTotalPrice } from '@/util/utilsFunctions';
import { useCart } from '@/hooks/useCart';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import TitlePage from '@/components/shared/Titles/TitlePage';
import mocks from './mock';
import { useAuth } from '@/hooks/useAuth';
import stockRequests, { IStock } from '@/util/requests/products/stockRequests';
import { ICategory, IProductInsert } from '@/hooks/useProducts';
import Main from '@/components/shared/Main';
import SectionCarousel from './SectionCarousel';

export type IResponseStock = Record<string, CategoryWithStock>;

interface CategoryWithStock extends ICategory {
  stock: IStock[];
}

const MakeOrderPage: React.FC = () => {
  const { addProductOrderInCart, cart } = useCart();

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [responseStock, setResponseStock] = useState<IResponseStock | null>(
    null
  );

  function sucess(data: IResponseStock) {
    setResponseStock(data);
  }
  useEffect(() => {
    stockRequests.getAllStockByCategory(sucess);
  }, []);

  const [stateButton, setStateButton] = useState('');

  const [cupSizeId, setCupSizeId] = useState<number[]>([]);
  const [flavoursIds, setFlavoursIds] = useState<number[]>([]);
  const [complementsIds, setComplementsIds] = useState<number[]>([]);
  const [toppingsIds, setToppingsIds] = useState<number[]>([]);
  const [fruitId, setFruitId] = useState<number[]>([]);
  const [plusIds, setPlusIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [objNewOrder, setObjNewOrder] = useState<IProductInsert>({
    id: 0,
    image: '',
    price: totalPrice,
    name: name,
    cupSizeId: cupSizeId[0],
    flavoursIds: flavoursIds,
    complementsIds: complementsIds,
    toppingsIds: toppingsIds,
    fruitId: fruitId[0],
    plusIds: plusIds
  });
  useEffect(() => {
    if (!responseStock) return console.log('responseStock é null');
    const totalPriceCupSize = calculateTotalPrice(
      cupSizeId,
      responseStock['Tamanhos'].stock
    );

    const totalPricePlus = calculateTotalPrice(
      plusIds,
      responseStock['Adicionais'].stock
    );

    const total = totalPriceCupSize + totalPricePlus;

    setTotalPrice(total);
  }, [cupSizeId, flavoursIds, complementsIds, toppingsIds, fruitId, plusIds]);

  useEffect(() => {
    if (objNewOrder && objNewOrder.id > 0) {
      addProductOrderInCart(objNewOrder);
      navigate('/cart');
    }
  }, [objNewOrder]);

  async function handleCreateOrder() {
    try {
      setStateButton('loading');

      const nameProduct = name
        ? name
        : userInfo?.name !== undefined
        ? 'Açaí - ' + userInfo?.name
        : 'Açaí';
      const idInCart = cart.length + 1 * 100000000;
      const updatedObjNewOrder = {
        id: idInCart,
        image: '',
        price: totalPrice,
        name: nameProduct,
        cupSizeId: cupSizeId[0],
        flavoursIds: flavoursIds,
        complementsIds: complementsIds,
        toppingsIds: toppingsIds,
        fruitId: fruitId[0],
        plusIds: plusIds
      };
      setObjNewOrder(updatedObjNewOrder);
    } catch (err) {
      console.log(err);
    }
  }
  if (responseStock) {
    return (
      <MakeOrderPageStyle>
        <ModalLoading stateButton={stateButton}>
          <div className="containerModal">
            <PopsicleLoading />
          </div>
        </ModalLoading>

        <TitlePage title={'Escolher pedido'} />
        <SectionCarousel
          titleSectionLeft={'Primeiro um tamanho'}
          titleSectionRight={'Quanto maior, melhor'}
          margin_top={0}
          objctResponseAPI={responseStock['Tamanhos'].stock}
          setProductIds={setCupSizeId}
          productIds={cupSizeId}
          showPrice={true}
        />

        <SectionCarousel
          titleSectionLeft={'Agora os sabores'}
          titleSectionRight={'Quantos quiser'}
          objctResponseAPI={responseStock['Sabores'].stock}
          setProductIds={setFlavoursIds}
          productIds={flavoursIds}
          amountSelection={responseStock['Sabores'].stock.length}
        />
        <SectionCarousel
          titleSectionLeft={'Agora os complementos'}
          titleSectionRight={'Até 5 (cinco)'}
          objctResponseAPI={responseStock['Complementos'].stock}
          setProductIds={setComplementsIds}
          productIds={complementsIds}
          amountSelection={5}
        />

        <SectionCarousel
          titleSectionLeft={'Caldas'}
          titleSectionRight={'Quantas quiser'}
          objctResponseAPI={responseStock['Caldas'].stock}
          setProductIds={setToppingsIds}
          productIds={toppingsIds}
          amountSelection={responseStock['Caldas'].stock.length}
        />

        <SectionCarousel
          titleSectionLeft={'Agora uma fruta'}
          titleSectionRight={'Porque a gente é saudável'}
          objctResponseAPI={responseStock['Frutas'].stock}
          setProductIds={setFruitId}
          productIds={fruitId}
        />

        <SectionCarousel
          titleSectionLeft={'Adicionais'}
          titleSectionRight={'A cereja do bolo'}
          objctResponseAPI={responseStock['Adicionais'].stock}
          setProductIds={setPlusIds}
          productIds={plusIds}
          amountSelection={responseStock['Adicionais'].stock.length}
          showPrice={true}
        />

        <FooterWithPriceAndButton
          total={formatPrice(totalPrice)}
          handleCreateOrder={handleCreateOrder}
          stateButton={stateButton}
          enableAdd={
            cupSizeId.length > 0 && flavoursIds.length > 0 ? true : false
          }
        />
      </MakeOrderPageStyle>
    );
  } else {
    return (
      <MakeOrderPageStyle>
        <Main margin_top="250">
          <PopsicleLoading />
        </Main>
      </MakeOrderPageStyle>
    );
  }
};

export default MakeOrderPage;

interface ModalLoading {
  stateButton: string;
}

const ModalLoading = styled.div<ModalLoading>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.stateButton === 'loading' ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  .containerModal {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
  }
`;

const MakeOrderPageStyle = styled.div`
  padding-bottom: 80px;
`;
