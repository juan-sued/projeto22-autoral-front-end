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
import complementpacoca from '../../../assets/complementpacoca.png';
import complementjujuba from '../../../assets/complementjujuba.png';
import componentaveia from '../../../assets/componentaveia.png';
import complementAmendoim from '../../../assets/complement-amendoim.png';
import complementBiscoitosCanudos from '../../../assets/complement-biscoitos-canudos.png';
import complementConfete from '../../../assets/complement-confete-chocolate.png';
import complementFlocoArroz from '../../../assets/complement-floco-de-arroz.png';
import complementGranulado from '../../../assets/complement-granulado.png';

import complementGranola from '../../../assets/complement-granola.png';

import bolcaacaihortela from '../../../assets/bolcaacaihortela.png';
import complementLeiteEmPo from '../../../assets/complement-leite-em-po.png';
import complementSucrilhos from '../../../assets/complement-sucrilhos.png';
import toppingChocolate from '../../../assets/topping-chocolate.png';
import toppingMenta from '../../../assets/topping-menta.png';
import toppingChocolateSuico from '../../../assets/topping-chocolate-suico.png';
import toppingMorango from '../../../assets/topping-morango.png';

import toppingLeiteCondensado from '../../../assets/topping-leite-condensado.png';
import toppingDoceDeLeite from '../../../assets/topping-doce-de-leite.png';
import toppingTuttiFrutti from '../../../assets/topping-tutti-frutti.png';
import toppingFrutasVermelhas from '../../../assets/toppings-frutas-vermelhas.png';
import fruitBanana from '../../../assets/fruit-banana.png';
import plusKitKat from '../../../assets/plus-kitkat.png';
import plusBis from '../../../assets/plus-bis.png';
import plusCremeAvela from '../../../assets/plus-creme-de-avela.png';
import plusCremeNinho from '../../../assets/plus-creme-ninho.png';
import plusCremeMorango from '../../../assets/plus-creme-morango.png';
import plusCremePacoca from '../../../assets/plus-creme-pacoca.png';

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

  const example: responseProducts = {
    sizes: [
      {
        id: 0,
        name: 'chocolate',
        price: 27.0,
        image: cupBig,
        category: 'categoria x',
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: ' Litro',
        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'chocolate',
        price: 27.0,
        image: cupBig,
        category: 'categoria x',
        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'ml',
        quantityForUnity: 1000
      },
      {
        id: 2,
        name: 'chocolate',
        price: 19.0,
        image: cupBig,
        category: 'categoria x',
        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'ml',
        quantityForUnity: 700
      },
      {
        id: 3,
        name: 'chocolate',
        price: 15.0,
        image: cupBig,
        category: 'categoria x',
        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'ml',
        quantityForUnity: 500
      },
      {
        id: 4,
        name: 'chocolate',
        price: 10.5,
        image: cupBig,
        category: 'categoria x',
        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'ml',
        quantityForUnity: 400
      },
      {
        id: 5,
        name: 'chocolate',
        price: 10.5,
        image: cupBig,
        category: 'categoria x',
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
        price: 27.0,
        image: bolaacaibanana,
        isFavorited: false,
        description: 'Natural',
        amount: 12,
        unitOfMeasure: 'unity',
        category: 'categoria x',
        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Natural',
        price: 27.0,
        image: bolaacainatural,
        isFavorited: false,
        description: 'Natural',
        amount: 12,
        unitOfMeasure: 'unity',
        category: 'categoria x',
        quantityForUnity: 1
      },
      {
        id: 2,
        name: 'Morango',
        price: 19.0,
        image: bolaacaimorango,

        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',
        category: 'categoria x',
        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'Guaraná',
        price: 15.0,
        image: bolaacaiguarana,
        category: 'categoria x',
        isFavorited: true,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Hortelã',
        price: 10.5,
        image: bolcaacaihortela,
        category: 'categoria x',
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
        price: 27.0,
        image: componentaveia,
        category: 'categoria x',
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Amendoim',
        price: 27.0,
        image: complementAmendoim,
        category: 'categoria x',
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 11
      },
      {
        id: 2,
        name: 'Biscoito',
        price: 19.0,
        image: complementBiscoitosCanudos,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'Confete',
        price: 15.0,
        image: complementConfete,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Flocos de Arroz',
        price: 10.5,
        image: complementFlocoArroz,
        category: 'categoria x',
        isFavorited: false,
        description: 'Granola',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'Granulado de chocolate',
        price: 10.5,
        image: complementGranulado,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'Granola',
        price: 10.5,
        image: complementGranola,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 7,
        name: 'Jujuba',
        price: 10.5,
        image: complementjujuba,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 8,
        name: 'Leite em pó',
        price: 10.5,
        image: complementLeiteEmPo,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 9,
        name: 'Paçoca',
        price: 10.5,
        image: complementpacoca,
        category: 'categoria x',
        isFavorited: true,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 10,
        name: 'Sucrilhos',
        price: 10.5,
        image: complementSucrilhos,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      }
    ],
    toppings: [
      {
        id: 0,
        name: 'Chocolate',
        price: 27.0,
        image: toppingChocolate,
        category: 'categoria x',
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Menta',
        price: 27.0,
        image: toppingMenta,
        category: 'categoria x',
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 11
      },
      {
        id: 2,
        name: 'Cholate Suíço',
        price: 19.0,
        image: toppingChocolateSuico,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'Morango',
        price: 15.0,
        image: toppingMorango,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Leite condensado',
        price: 10.5,
        image: toppingLeiteCondensado,
        category: 'categoria x',
        isFavorited: false,
        description: 'Granola',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'Doce de leite',
        price: 10.5,
        image: toppingDoceDeLeite,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'Tutti Frutti',
        price: 10.5,
        image: toppingTuttiFrutti,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 7,
        name: 'Frutas vermelhas',
        price: 10.5,
        image: toppingFrutasVermelhas,
        category: 'categoria x',
        isFavorited: false,
        description: '',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 1
      }
    ],
    fruits: [
      {
        id: 0,
        name: 'Morango',
        price: 27.0,
        image: toppingMorango,
        category: 'categoria x',
        isFavorited: false,
        description: 'Granola boa',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'Banana',
        price: 27.0,
        image: fruitBanana,
        category: 'categoria x',
        isFavorited: false,
        description: 'Banana',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 11
      }
    ],
    plus: [
      {
        id: 0,
        name: 'Bis',
        price: 2.0,
        image: plusBis,
        category: 'categoria x',
        isFavorited: false,
        description: '34g',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 1,
        name: 'KitKat',
        price: 2.0,
        image: plusKitKat,
        category: 'categoria x',
        isFavorited: false,
        description: '22,5g',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 2
      },
      {
        id: 2,
        name: 'KitKat',
        price: 4.0,
        image: plusKitKat,
        category: 'categoria x',
        isFavorited: false,
        description: '45g',
        amount: 12,
        unitOfMeasure: 'unity',
        quantityForUnity: 4
      },
      {
        id: 3,
        name: 'Creme de Avelã',
        price: 3.0,
        image: plusCremeAvela,
        category: 'categoria x',
        isFavorited: false,
        description: '40g',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'Creme de leite ninho',
        price: 3.0,
        image: plusCremeNinho,
        category: 'categoria x',
        isFavorited: false,
        description: '40g',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'Creme de morango',
        price: 3,
        image: plusCremeMorango,
        category: 'categoria x',
        isFavorited: false,
        description: '40g',
        amount: 12,
        unitOfMeasure: 'unity',

        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'Creme de paçoca',
        price: 3,
        image: plusCremePacoca,
        category: 'categoria x',
        isFavorited: false,
        description: '40g',
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
