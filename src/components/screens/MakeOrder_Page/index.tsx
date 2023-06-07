import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import TitlePage from '../../shared/TitlePage';
import { Container, Total } from '../Cart_Page/components/styles';
import { useEffect, useState } from 'react';
import CarouselListProduct from '../../shared/CarouselListProduct';
import { Product } from '../../../hooks/useProducts';
import cupBig from '../../../assets/copoacai.svg';

interface CartProps {
  message?: string;
  isSigned?: boolean;
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

  const example: Product[] = [
    {
      id: 0,
      name: 'chocolate',
      price: '27,00',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: ' Litro',
      quantityForUnity: 1
    },
    {
      id: 1,
      name: 'chocolate',
      price: '27,00',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: 'ml',
      quantityForUnity: 1000
    },
    {
      id: 2,
      name: 'chocolate',
      price: '19,00',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: 'ml',
      quantityForUnity: 700
    },
    {
      id: 3,
      name: 'chocolate',
      price: '15,00',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: 'ml',
      quantityForUnity: 500
    },
    {
      id: 4,
      name: 'chocolate',
      price: '10,50',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: 'ml',
      quantityForUnity: 400
    },
    {
      id: 5,
      name: 'chocolate',
      price: '10,50',
      image: cupBig,
      categoryId: 4,
      isFavorited: true,
      description: 'Banana',
      amount: 12,
      unitOfMeasure: 'ml',
      quantityForUnity: 300
    }
  ];

  return (
    <>
      <Back />
      <TitlePage title={'Escolher pedido'} />
      <CarouselListProduct
        titleSession={'Primeiro um tamanho'}
        margin_top={50}
        objctResponseAPI={example}
        setProductIds={setCupSizeId}
        productIds={cupSizeId}
        uniqueSelection={true}
      />
      <CarouselListProduct
        titleSession={'Escolha 1 sabor'}
        margin_top={50}
        objctResponseAPI={example}
        setProductIds={setFlavoursIds}
        productIds={flavoursIds}
        uniqueSelection={false}
      />
      <CarouselListProduct
        titleSession={'Escolha 1 sabor'}
        margin_top={50}
        objctResponseAPI={example}
        setProductIds={setComplementsIds}
        productIds={complementsIds}
        uniqueSelection={false}
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
