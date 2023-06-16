import mocks from '@/components/screens/MakeOrder_Page/mock';
import { objNewOrderParams } from './../../../components/screens/MakeOrder_Page/index';
import { HomeResponseAPI } from '@/components/screens/Home_Page/HomePage';
import { ObjNewProduct } from '@/components/screens/Stock_Page/inputsRegisterProduct/InputsRegisterProduct';
import { Product } from '@/hooks/useProducts';
import { axiosI, productsRouter } from '@/Routes/services/axios';

interface SetObjNewProduct {
  (obj: ObjNewProduct): void;
}

async function postRegisterProduct(
  objNewProduct: ObjNewProduct,
  setObjNewProduct: SetObjNewProduct,
  success: () => void
): Promise<void> {
  try {
    await axiosI.post(`/products`);
    success();
  } catch (err) {
    console.error(err);
    setObjNewProduct({ ...objNewProduct, price: '' });
  }
}

export interface ProductCustomized {
  id: number;
  name: string;
  image: string;
  price: number;
  cupSize: Product;
  flavours: Product[];
  complements: Product[];
  toppings: Product[];
  fruit: Product;
  plus: Product[];
}

async function postRegisterProductCustomized(
  objNewProduct: objNewOrderParams
): Promise<ProductCustomized> {
  try {
    const { data } = await productsRouter.post(
      `/new-order-client`,
      objNewProduct
    );

    return data;
  } catch (err) {
    console.error(err);
    return mocks.exampleNewOrderCustomized;
  }
}

async function getVerifyAmountProductCustomizedAvaibles(
  productCustomized: ProductCustomized
): Promise<ProductCustomized> {
  try {
    const { data } = await productsRouter.post(
      `/verify-product-customized`,
      productCustomized
    );

    return data;
  } catch (err) {
    console.error(err);
    return mocks.exampleNewOrderCustomized;
  }
}

async function getProductsByCharacter(character: string): Promise<Product[]> {
  try {
    const { data } = await axiosI.get(`/products/product?name=${character}`);
    return data;
  } catch (err) {
    console.error(err);
    return [
      {
        id: 1,
        name: 'produto 1',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto x',
        isFavorited: false,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 2,
        name: 'banana',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto y',
        isFavorited: false,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 3,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 4,
        name: 'chocolate',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 5,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      },
      {
        id: 6,
        name: 'menta',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        category: 'produto z',
        isFavorited: true,
        description: '1 Litro',
        amount: 2,
        unitOfMeasure: 'unit',
        quantityForUnity: 1
      }
    ];
  }
}

async function getProductById(productId: string): Promise<Product> {
  try {
    const { data } = await axiosI.get(`/products/${productId}`);
    return data;
  } catch (err) {
    return {
      id: 1,
      name: 'produto ' + Math.floor(Math.random() * 5),
      price: 2.5,
      image: 'https://asdasdas',
      category: 'produto x',
      isFavorited: false,
      description: '1 Litro',
      amount: 3,
      unitOfMeasure: 'unit',
      quantityForUnity: 1
    };
  }
}

interface ResponseAPI {}

function getOfertDay(
  objResponseAPI: HomeResponseAPI,
  setObjResponseAPI: (value: ResponseAPI) => void,
  signOut: () => void
): void {
  axiosI
    .get('/products/ofert-day')
    .then(response => {
      if (response.status === 200) {
        setObjResponseAPI({ ...objResponseAPI, ofertOfDay: response.data });
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        signOut();
      }
      console.log(err);
    });
}

function getMoreOrders(
  objResponseAPI: ResponseAPI,
  setObjResponseAPI: (value: ResponseAPI) => void,
  signOut: () => void
): void {
  axiosI
    .get('/more-orders')
    .then(response => {
      if (response.status === 200) {
        setObjResponseAPI({ ...objResponseAPI, moreOrders: response.data });
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        signOut();
      }
      console.log(err);
    });
}

function getFavoriteds(
  favoritedsList: Product[],
  setFavoritedsList: (value: Product[]) => void,
  signOut: () => void
): void {
  axiosI
    .get(`/favoriteds`)
    .then(({ data }) => {
      setFavoritedsList([...favoritedsList, data]);
    })
    .catch(err => console.error(err));
}

async function updateIsFavorite(productId: number): Promise<void> {
  try {
    await productsRouter.put(`/favorited/${productId}`);
  } catch (err) {
    throw new Error('Erro ao favoritar');
  }
}

const productRequests = {
  postRegisterProduct,
  getProductsByCharacter,
  getOfertDay,
  getMoreOrders,
  getFavoriteds,
  getProductById,
  postRegisterProductCustomized,
  getVerifyAmountProductCustomizedAvaibles,
  updateIsFavorite
};

export default productRequests;
