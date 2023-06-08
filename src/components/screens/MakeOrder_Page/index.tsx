import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import TitlePage from '../../shared/TitlePage';
import { Container, Total } from '../Cart_Page/components/styles';
import { useEffect, useState } from 'react';
import CarouselListProduct from '../../shared/CarouselListProduct';
import { Product } from '../../../hooks/useProducts';
import cupBig from '../../../assets/copoacai.svg';
import TitleSectionRight from '../../shared/TitleSectionRight';
import TitleSectionLeft from '../../shared/TitleSectionLeft';
import bolaacaibanana from '../../../assets/bolaacaibanana.png';
import bolaacainatural from '../../../assets/bolaacainatural.png';
import bolaacaiguarana from '../../../assets/bolaacaiguarana.png';
import bolaacaimorango from '../../../assets/bolaacaimorango.png';

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

  const example: responseProducts = {
    sizes: [
      {
        id: 0,
        name: 'chocolate',
        price: '27,00',
        image: cupBig,
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: ' Litro',
        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'chocolate',
        price: '27,00',
        image: cupBig,

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

        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'ml',
        quantityForUnity: 300
      }
    ],
    flavours: [
      {
        id: 0,
        name: 'Banana',
        price: '27,00',
        image: bolaacaibanana,
        isFavorited: false,
        description: 'Natural',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Natural',
        price: '27,00',
        image: bolaacainatural,
        isFavorited: false,
        description: 'Natural',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 2,
        name: 'Morango',
        price: '19,00',
        image: bolaacaimorango,

        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'Guaraná',
        price: '15,00',
        image: bolaacaiguarana,

        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Hortelã',
        price: '10,50',
        image: cupBig,

        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      }
    ],
    complements: [
      {
        id: 0,
        name: 'Aveia',
        price: '27,00',
        image: cupBig,
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Amendoim',
        price: '27,00',
        image: cupBig,
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 11
      },
      {
        id: 2,
        name: 'Biscoito',
        price: '19,00',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'Confete',
        price: '15,00',
        image: cupBig,

        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Flocos de Arroz',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: 'Granola',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'Granulado de chocolate',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'Granola',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 7,
        name: 'Jujuba',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 8,
        name: 'Leite em pó',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 9,
        name: 'Paçoca',
        price: '10,50',
        image: cupBig,
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      },
      {
        id: 10,
        name: 'Sucrilhos',
        price: '10,50',
        image: cupBig,
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      }
    ]
  };

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
