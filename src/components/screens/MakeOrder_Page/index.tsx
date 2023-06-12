import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Product } from '@/hooks/useProducts';

import { example } from './mock';
import { formatPrice } from '@/util/format';
import { calculateTotalPrice, formatListNames } from '@/util/utilsFunctions';
import { useCart } from '@/hooks/useCart';
import CarouselListProduct from '@/components/shared/Carousels/CarouselListProduct';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import TitlePage from '@/components/shared/Titles/TitlePage';
import TitleSectionLeft from '@/components/shared/Titles/TitleSectionLeft';
import TitleSectionRight from '@/components/shared/Titles/TitleSectionRight';
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
  cupSizeId: number;
  flavoursIds: number[];
  complementsIds: number[];
  toppingsIds: number[];
  fruitId: number;
  plusIds: number[];
}

const MakeOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [stateButton, setStateButton] = useState('');
  const [objNewOrder, setObjNewOrder] = useState<objNewOrderParams>({
    cupSizeId: 23,
    flavoursIds: [124, 5, 3],
    complementsIds: [85, 32, 90],
    toppingsIds: [10, 23, 50],
    fruitId: 92,
    plusIds: [231, 111, 282]
  });

  const [cupSizeId, setCupSizeId] = useState<number[]>([]);
  const [flavoursIds, setFlavoursIds] = useState<number[]>([]);
  const [complementsIds, setComplementsIds] = useState<number[]>([]);
  const [toppingsIds, setToppingsIds] = useState<number[]>([]);
  const [fruitId, setFruitId] = useState<number[]>([]);
  const [plusIds, setPlusIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>('');

  useEffect(() => {
    const totalPriceCupSize = calculateTotalPrice(cupSizeId, example.sizes);

    const totalPricePlus = calculateTotalPrice(plusIds, example.plus);

    const total = totalPriceCupSize + totalPricePlus;

    setTotalPrice(formatPrice(total));
  }, [cupSizeId, flavoursIds, complementsIds, toppingsIds, fruitId, plusIds]);

  const { addProductOrder } = useCart();

  async function handleCreateOrder() {
    setObjNewOrder({
      cupSizeId: cupSizeId[0],
      flavoursIds: flavoursIds,
      complementsIds: complementsIds,
      toppingsIds: toppingsIds,
      fruitId: fruitId[0],
      plusIds: plusIds
    });
    setStateButton('loading');
    const result = await addProductOrder(objNewOrder);
    if (!result) throw new Error('Deu ruim pegando products');

    setStateButton('');
    if (result.unavailables.length === 0) {
      navigate('/cart');
    } else {
      const names = result.unavailables.map(product => product.name);
      alert('Produtos em falta no estoque: ' + formatListNames(names));
    }
  }

  return (
    <MakeOrderPageStyle>
      <ModalLoading stateButton={stateButton}>
        <div className="containerModal">
          <PopsicleLoading />
          <div className="Message">
            Verificando disponibilidades dos produtos
          </div>
        </div>
      </ModalLoading>

      <TitlePage title={'Escolher pedido'} />
      <TitleSectionLeft titleSession={'Primeiro um tamanho'} />
      <TitleSectionRight titleSession={'Quanto maior, melhor'} />
      <CarouselListProduct
        margin_top={0}
        objctResponseAPI={example.sizes}
        setProductIds={setCupSizeId}
        productIds={cupSizeId}
        amountSelection={1}
        showPrice={true}
      />
      <TitleSectionLeft titleSession={'Agora os sabores'} />

      <TitleSectionRight titleSession={'Quantos quiser'} />

      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={example.flavours}
        setProductIds={setFlavoursIds}
        productIds={flavoursIds}
        amountSelection={example.flavours.length}
      />
      <TitleSectionLeft titleSession={'Agora os complementos'} />
      <TitleSectionRight titleSession={'Até 5 (cinco)'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={example.complements}
        setProductIds={setComplementsIds}
        productIds={complementsIds}
        amountSelection={5}
      />
      <TitleSectionLeft titleSession={'Caldas'} />
      <TitleSectionRight titleSession={'Quantas quiser'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={example.toppings}
        setProductIds={setToppingsIds}
        productIds={toppingsIds}
        amountSelection={example.toppings.length}
      />
      <TitleSectionLeft titleSession={'Agora uma fruta'} />
      <TitleSectionRight titleSession={'Porque a gente é saudável'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={example.fruits}
        setProductIds={setFruitId}
        productIds={fruitId}
        amountSelection={1}
      />
      <TitleSectionLeft titleSession={'Adicionais'} />
      <TitleSectionRight titleSession={'A cereja do bolo'} />
      <CarouselListProduct
        margin_top={50}
        objctResponseAPI={example.plus}
        setProductIds={setPlusIds}
        productIds={plusIds}
        amountSelection={example.plus.length}
        showPrice={true}
      />

      <FooterWithPriceAndButton
        total={totalPrice}
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
