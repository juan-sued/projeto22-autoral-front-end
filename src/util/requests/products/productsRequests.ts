import { HomeResponseAPI } from '../../../components/screens/Home_Page/HomePage';
import { ObjNewProduct } from '../../../components/screens/Stock_Page/inputsRegisterProduct/InputsRegisterProduct';
import { Product } from '../../../hooks/useProducts';
import { axiosI } from '../../../services/axios';

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

async function getProductsByCharacter(
  searchProduct: { searchBar: string },
  setResponseProducts: (value: Product[]) => void
): Promise<void> {
  try {
    const { data } = await axiosI.get(
      `/products/product?name=${searchProduct.searchBar}`
    );
    setResponseProducts(data);
  } catch (err) {
    console.error(err);
    setResponseProducts([
      {
        id: 1,
        name: 'e',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 1,
        isFavorited: false,
        description: '1 Litro',
        amount: 2
      },
      {
        id: 2,
        name: 'banana',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 2,
        isFavorited: false,
        description: '1 Litro',
        amount: 2
      },
      {
        id: 3,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 3,
        isFavorited: true,
        description: '1 Litro',
        amount: 2
      },
      {
        id: 4,
        name: 'chocolate',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 4,
        isFavorited: true,
        description: '1 Litro',
        amount: 2
      },
      {
        id: 5,
        name: 'morango',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 5,
        isFavorited: true,
        description: '1 Litro',
        amount: 2
      },
      {
        id: 6,
        name: 'menta',
        price: 2.5,
        image: 'https://asdasdasdasdasd',
        categoryId: 7,
        isFavorited: true,
        description: '1 Litro',
        amount: 2
      }
    ]);
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

const productRequests = {
  postRegisterProduct,
  getProductsByCharacter,
  getOfertDay,
  getMoreOrders,
  getFavoriteds
};

export default productRequests;
