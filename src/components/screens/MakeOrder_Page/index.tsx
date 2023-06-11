import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import TitlePage from '../../shared/TitlePage';
import { Container, Total } from '../Cart_Page/components/styles';
import { useEffect, useState } from 'react';
import CarouselListProduct from '../../shared/CarouselListProduct';
import { Product } from '../../../hooks/useProducts';

import TitleSectionRight from '../../shared/TitleSectionRight';
import TitleSectionLeft from '../../shared/TitleSectionLeft';

import { example } from './mock';
import { formatPrice } from '../../../util/format';

interface CartProps {
  message?: string;
  isSigned?: boolean;
}

export interface responseProducts {
  sizes: Product[];
  flavours: Product[];
  complements: Product[];
  toppings: Product[];
  fruits: Product[];
  plus: Product[];
}
//topping === cobertura
interface objNewOrderParams {
  cupSizeId: number;
  flavoursIds: number[];
  complementsIds: number[];
  toppingsIds: number[];
  fruitId: number;
  plusIds: number[];
}

const MakeOrderPage: React.FC<CartProps> = ({ isSigned = false }) => {
  const navigate = useNavigate();
  //request para pegar os produtos de MakeOrderPage
  const [objNewOrder, setObjNewOrder] = useState<objNewOrderParams>({
    cupSizeId: 1,
    flavoursIds: [1, 2, 3],
    complementsIds: [1, 2, 3],
    toppingsIds: [1, 2, 3],
    fruitId: 3,
    plusIds: [1, 2, 3]
  });

  const [cupSizeId, setCupSizeId] = useState<number[]>([]);
  const [flavoursIds, setFlavoursIds] = useState<number[]>([]);
  const [complementsIds, setComplementsIds] = useState<number[]>([]);
  const [toppingsIds, setToppingsIds] = useState<number[]>([]);
  const [fruitId, setFruitId] = useState<number[]>([]);
  const [plusIds, setPlusIds] = useState<number[]>([]);

  const [totalPrice, setTotalPrice] = useState<string>('');

  useEffect(() => {
    // Exemplo de uso:
    const totalPriceCupSize = calculateTotalPrice(cupSizeId, example.sizes);
    const totalPriceFlavours = calculateTotalPrice(
      flavoursIds,
      example.flavours
    );
    const totalPriceComplements = calculateTotalPrice(
      complementsIds,
      example.complements
    );
    const totalPriceToppings = calculateTotalPrice(
      toppingsIds,
      example.toppings
    );
    const totalPriceFruit = calculateTotalPrice(fruitId, example.fruits);
    const totalPricePlus = calculateTotalPrice(plusIds, example.plus);

    const total =
      totalPriceCupSize +
      totalPriceFlavours +
      totalPriceComplements +
      totalPriceToppings +
      totalPriceFruit +
      totalPricePlus;

    setTotalPrice(formatPrice(total));
  }, [cupSizeId, flavoursIds, complementsIds, toppingsIds, fruitId, plusIds]);

  const [responseProducts, setResponseProducts] = useState([]);

  function calculateTotalPrice(ids: number[], products: Product[]): number {
    return ids
      .filter(productId => products.some(product => product.id === productId))
      .map(
        productId =>
          products.find(product => product.id === productId)?.price || 0
      )
      .reduce((accumulator, price) => accumulator + price, 0);
  }
  return (
    <>
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
      <Container>
        <footer>
          <button type="button">Adicionar ao carrinho</button>
          <Total>
            <span>TOTAL</span>
            <strong>{totalPrice}</strong>
          </Total>
        </footer>
      </Container>
    </>
  );
};

const Back = styled.div`
  background-color: '#EEEDF4';
  position: fixed;
  min-height: 100%;
  min-width: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MakeOrderPage;
