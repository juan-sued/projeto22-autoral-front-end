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

interface CartProps {
  message?: string;
  isSigned?: boolean;
}
export interface responseProductsWithoutCategories
  extends Omit<Product, 'categoryId'> {}

export interface responseProducts {
  sizes: responseProductsWithoutCategories[];
  flavours: responseProductsWithoutCategories[];
  complements: responseProductsWithoutCategories[];
  toppings: responseProductsWithoutCategories[];
  fruits: responseProductsWithoutCategories[];
  plus: responseProductsWithoutCategories[];
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

  const [responseProducts, setResponseProducts] = useState([]);

  // console.log('cupSizeId:', cupSizeId);
  // console.log('flavoursIds:', flavoursIds);
  // console.log('complementsIds:', complementsIds);
  // console.log('toppingsIds:', toppingsIds);
  // console.log('fruitId:', fruitId);
  // console.log('plusIds:', plusIds);
  useEffect(() => {
    // requestMakeOrderPage(); -- pega as infos da página
  }, []);

  //arr.toString().replace(/,/g, ', '); const arr = [batata,feijao,tomate] => 'batata, feijao, tomate'

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
      <TitleSectionLeft titleSession={'Cobertura'} />
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
          {isSigned ? (
            <button type="button">Finalizar Compra</button>
          ) : (
            <button type="button" onClick={() => navigate('/')}>
              Fazer login
            </button>
          )}
          <Total>
            <span>TOTAL</span>
            <strong>R$ {'2,50'}</strong>
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
