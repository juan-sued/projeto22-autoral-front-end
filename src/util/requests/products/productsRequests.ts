import { IProductBasic } from './../../../hooks/useProducts';
import mocks from '@/components/screens/MakeOrder_Page/mock';
import { axiosI } from '@/services/axios';
import { IProductInsert, IProductById } from '@/hooks/useProducts';

type TPostProduct = Omit<IProductInsert, 'id'>;

async function postProduct(
  objNewProduct: TPostProduct,
  setObjNewProduct: (obj: TPostProduct) => void,
  success: () => void
): Promise<void> {
  try {
    await axiosI.post(`/products`);
    success();
  } catch (err) {
    console.error(err);
    setObjNewProduct({ ...objNewProduct, price: 0 });
  }
}

async function postRegisterProduct(
  objNewProduct: IProductInsert
): Promise<IProductInsert> {
  try {
    const { data } = await axiosI.post(`products/`, objNewProduct);

    return data;
  } catch (err) {
    console.error(err);
    return mocks.exampleNewOrderCustomized;
  }
}

async function getProductsByCharacter(
  character: string
): Promise<IProductBasic[] | null> {
  try {
    const { data } = await axiosI.get(`/products/title?char=${character}`);

    return data;
  } catch (err) {
    console.error('erro ao pegar products por caracter', err);
    return null;
  }
}

async function getProductById(productId: string): Promise<IProductById | null> {
  try {
    const { data } = await axiosI.get(`/products/${productId}`);
    return data;
  } catch (err) {
    console.error('erro ao pegar products por caracter', err);
    return null;
  }
}

interface IOfertsOfDay {
  userId: number;
  productId: number;
  description: string;
  showInit: Date;
  showFinal: Date;
  createdAt: Date;
  price_ofert: string;
  product: IProductById;
}

async function getOfertDay(
  signOut: () => void
): Promise<IOfertsOfDay[] | null> {
  try {
    const { data } = await axiosI.get('/products/oferts-day');
    return data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      signOut();
    }

    return null;
  }
}

async function getMoreOrders(
  signOut: () => void
): Promise<IProductBasic[] | null> {
  try {
    const { data } = await axiosI.get('/products/more-orders');
    return data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      signOut();
    }

    return null;
  }
}

async function getFavoritedsByUserId(
  signOut: () => void
): Promise<IProductBasic[] | null> {
  try {
    const { data } = await axiosI.get('/products/favoriteds');
    return data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      signOut();
    }

    return null;
  }
}

const productRequests = {
  postProduct,
  getProductsByCharacter,
  getOfertDay,
  getMoreOrders,
  getProductById,
  postRegisterProduct,
  getFavoritedsByUserId
};

export default productRequests;
