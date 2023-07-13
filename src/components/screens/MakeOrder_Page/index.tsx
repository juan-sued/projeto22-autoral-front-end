import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { formatPrice } from '@/util/format';
import { calculateTotalPrice } from '@/util/utilsFunctions';
import { useCart } from '@/hooks/useCart';
import CarouselListStock from '@/components/shared/Carousels/CarouselListStock';
import FooterWithPriceAndButton from '@/components/shared/Footers/FooterWithPriceAndButton';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import TitlePage from '@/components/shared/Titles/TitlePage';
import TitleSectionLeft from '@/components/shared/Titles/TitleSectionLeft';
import TitleSectionRight from '@/components/shared/Titles/TitleSectionRight';
import mocks from './mock';
import { useAuth } from '@/hooks/useAuth';
import stockRequests, { IStock } from '@/util/requests/products/stockRequests';
import { ICategory, IProductInsert } from '@/hooks/useProducts';
import Loading from '@/components/shared/Loaders/Loading';
import Main from '@/components/shared/Main';

export type IResponseStock = Record<string, CategoryWithStock>;

interface CategoryWithStock extends ICategory {
  stock: IStock[];
}

const MakeOrderPage: React.FC = () => {
  const { addProductOrderInCart, cart } = useCart();

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const example: IResponseStock = {
    'categoria 1': {
      id: 4,
      name: 'categoria 1',
      description: 'descrição categoria 1',
      stock: [
        {
          id: 6,
          title: 'Product 1',
          description: 'Description 1',
          image: '',
          price: '9.99',
          quantity_for_unity: '1.5',
          unit_of_measure: 'unit',
          amount: 10,
          categoryId: 4,
          category: {
            id: 4,
            name: 'categoria 1',
            description: 'descrição categoria 1'
          }
        }
      ]
    },
    'categoria 2': {
      id: 5,
      name: 'categoria 2',
      description: 'descrição categoria 2',
      stock: [
        {
          id: 7,
          title: 'Tamanho 1000ml',
          description: 'Maior que temos',
          image: 'asdasdasdasda',
          price: '27',
          quantity_for_unity: '1000',
          unit_of_measure: 'ml',
          amount: 12,
          categoryId: 5,
          category: {
            id: 5,
            name: 'categoria 2',
            description: 'descrição categoria 2'
          }
        },
        {
          id: 8,
          title: 'Biscoito',
          description: 'Maior que temos',
          image: 'asdasdasdasda',
          price: '27',
          quantity_for_unity: '2',
          unit_of_measure: 'unit',
          amount: 12,
          categoryId: 5,
          category: {
            id: 5,
            name: 'categoria 2',
            description: 'descrição categoria 2'
          }
        }
      ]
    },
    'categoria 3': {
      id: 6,
      name: 'categoria 3',
      description: 'descrição categoria 3',
      stock: []
    }
  };
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
        <TitleSectionLeft titleSession={'Primeiro um tamanho'} />
        <TitleSectionRight titleSession={'Quanto maior, melhor'} />
        <CarouselListStock
          margin_top={0}
          objctResponseAPI={responseStock['Tamanhos'].stock}
          setProductIds={setCupSizeId}
          productIds={cupSizeId}
          amountSelection={1}
          showPrice={true}
        />
        <TitleSectionLeft titleSession={'Agora os sabores'} />

        <TitleSectionRight titleSession={'Quantos quiser'} />

        <CarouselListStock
          margin_top={50}
          objctResponseAPI={responseStock['categoria 2'].stock}
          setProductIds={setFlavoursIds}
          productIds={flavoursIds}
          amountSelection={responseStock['categoria 2'].stock.length}
        />
        <TitleSectionLeft titleSession={'Agora os complementos'} />
        <TitleSectionRight titleSession={'Até 5 (cinco)'} />
        <CarouselListStock
          margin_top={50}
          objctResponseAPI={responseStock['categoria 3'].stock}
          setProductIds={setComplementsIds}
          productIds={complementsIds}
          amountSelection={5}
        />
        <TitleSectionLeft titleSession={'Caldas'} />
        <TitleSectionRight titleSession={'Quantas quiser'} />
        <CarouselListStock
          margin_top={50}
          objctResponseAPI={responseStock['categoria 1'].stock}
          setProductIds={setToppingsIds}
          productIds={toppingsIds}
          amountSelection={responseStock['categoria 1'].stock.length}
        />
        <TitleSectionLeft titleSession={'Agora uma fruta'} />
        <TitleSectionRight titleSession={'Porque a gente é saudável'} />
        <CarouselListStock
          margin_top={50}
          objctResponseAPI={responseStock['categoria 2'].stock}
          setProductIds={setFruitId}
          productIds={fruitId}
          amountSelection={1}
        />
        <TitleSectionLeft titleSession={'Adicionais'} />
        <TitleSectionRight titleSession={'A cereja do bolo'} />
        <CarouselListStock
          margin_top={50}
          objctResponseAPI={responseStock['categoria 3'].stock}
          setProductIds={setPlusIds}
          productIds={plusIds}
          amountSelection={responseStock['categoria 1'].stock.length}
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
