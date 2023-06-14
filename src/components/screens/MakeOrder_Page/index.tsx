import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Product } from '@/hooks/useProducts';

import { formatPrice } from '@/util/format';
import { calculateTotalPrice, formatListNames } from '@/util/utilsFunctions';
import { useCart } from '@/hooks/useCart';
import CarouselListProduct from '@/components/shared/Carousels/CarouselListProduct';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import TitlePage from '@/components/shared/Titles/TitlePage';
import TitleSectionLeft from '@/components/shared/Titles/TitleSectionLeft';
import TitleSectionRight from '@/components/shared/Titles/TitleSectionRight';
import mocks from './mock';
import { useAuth } from '@/hooks/useAuth';
export interface responseProducts {
  sizes: Product[];
  flavours: Product[];
  complements: Product[];
  toppings: Product[];
  fruits: Product[];
  plus: Product[];
}
//topping === cobertura
export interface objNewOrderParams {
  id: number;
  name: string;
  image: string;
  price: number;
  cupSizeId: number;
  flavoursIds: number[];
  complementsIds: number[];
  toppingsIds: number[];
  fruitId: number;
  plusIds: number[];
}

const MakeOrderPage: React.FC = () => {
  const { addProductOrderInCart, cart } = useCart();

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [stateButton, setStateButton] = useState('');

  const [cupSizeId, setCupSizeId] = useState<number[]>([]);
  const [flavoursIds, setFlavoursIds] = useState<number[]>([]);
  const [complementsIds, setComplementsIds] = useState<number[]>([]);
  const [toppingsIds, setToppingsIds] = useState<number[]>([]);
  const [fruitId, setFruitId] = useState<number[]>([]);
  const [plusIds, setPlusIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [objNewOrder, setObjNewOrder] = useState<objNewOrderParams>({
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
    const totalPriceCupSize = calculateTotalPrice(
      cupSizeId,
      mocks.exampleProductsOrder.sizes
    );

    const totalPricePlus = calculateTotalPrice(
      plusIds,
      mocks.exampleProductsOrder.plus
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
        ? 'Açaí -' + userInfo?.name
        : 'Açaí';
      const idInCart = cart.length + 1;
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

  return (
    <MakeOrderPageStyle>
      <ModalLoading stateButton={stateButton}>
        <div className="containerModal">
          <PopsicleLoading />
        </div>
      </ModalLoading>

      <TitlePage title={'Escolher pedido'} />
      <TitleSectionLeft titleSession={'Primeiro um tamanho'} />
      <TitleSectionRight titleSession={'Quanto maior, melhor'} />
      <CarouselListProduct
        margin_top={0}
        objctResponseAPI={mocks.exampleProductsOrder.sizes}
        setProductIds={setCupSizeId}
        productIds={cupSizeId}
        amountSelection={1}
        showPrice={true}
      />
      <TitleSectionLeft titleSession={'Agora os sabores'} />

      <TitleSectionRight titleSession={'Quantos quiser'} />

      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={mocks.exampleProductsOrder.flavours}
        setProductIds={setFlavoursIds}
        productIds={flavoursIds}
        amountSelection={mocks.exampleProductsOrder.flavours.length}
      />
      <TitleSectionLeft titleSession={'Agora os complementos'} />
      <TitleSectionRight titleSession={'Até 5 (cinco)'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={mocks.exampleProductsOrder.complements}
        setProductIds={setComplementsIds}
        productIds={complementsIds}
        amountSelection={5}
      />
      <TitleSectionLeft titleSession={'Caldas'} />
      <TitleSectionRight titleSession={'Quantas quiser'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={mocks.exampleProductsOrder.toppings}
        setProductIds={setToppingsIds}
        productIds={toppingsIds}
        amountSelection={mocks.exampleProductsOrder.toppings.length}
      />
      <TitleSectionLeft titleSession={'Agora uma fruta'} />
      <TitleSectionRight titleSession={'Porque a gente é saudável'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={mocks.exampleProductsOrder.fruits}
        setProductIds={setFruitId}
        productIds={fruitId}
        amountSelection={1}
      />
      <TitleSectionLeft titleSession={'Adicionais'} />
      <TitleSectionRight titleSession={'A cereja do bolo'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={mocks.exampleProductsOrder.plus}
        setProductIds={setPlusIds}
        productIds={plusIds}
        amountSelection={mocks.exampleProductsOrder.plus.length}
        showPrice={true}
      />

      <FooterWithPriceAndButton
        total={formatPrice(totalPrice)}
        handleCreateOrder={handleCreateOrder}
        stateButton={stateButton}
      />
    </MakeOrderPageStyle>
  );
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
