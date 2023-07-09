import { axiosI } from '@/services/axios';
import { ICategory } from '@/hooks/useProducts';

export interface IStock {
  id: number;
  title: string;
  image: string;
  price: string;
  description: string;
  categoryId: number;
  unit_of_measure: string;
  amount: number;
  quantity_for_unity: string;
  category: ICategory;
}

export interface IStockBasic {
  id: number;
  title: string;
  image: string;
}

type TPostStock = Omit<IStock, 'id'>;

async function postStock(
  objNewStock: TPostStock,
  setObjNewStock: (obj: TPostStock) => void,
  success: () => void
): Promise<void> {
  try {
    await axiosI.post(`/stock`);
    success();
  } catch (err) {
    console.error(err);
    setObjNewStock({ ...objNewStock, price: '' });
  }
}

async function getStocksByCharacter(
  setStockList: (stockList: IStockBasic[]) => void,
  character: string
): Promise<void> {
  try {
    const { data } = await axiosI.get(`/stock/title?char=${character}`);

    setStockList(data);
    return data;
  } catch (err) {
    console.error(err);
    console.log('erro ao pegar stock por caracter');
  }
}

async function getStockById(stockId: string): Promise<IStock> {
  try {
    const { data } = await axiosI.get(`/stock/${stockId}`);
    return data;
  } catch (err) {
    return {
      id: 7,
      title: 'Tamanho 1000ml',
      image: 'asdasdasdasda',
      price: '27',
      description: 'Maior que temos',
      categoryId: 5,
      unit_of_measure: 'ml',
      amount: 12,
      quantity_for_unity: '1000',
      category: {
        id: 5,
        name: 'categoria 2',
        description: 'descrição categoria 2'
      }
    };
  }
}

const stockRequests = {
  postStock,
  getStocksByCharacter,
  getStockById
};

export default stockRequests;
