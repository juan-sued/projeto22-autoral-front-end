import { createContext, useContext, useState } from 'react';
import { axiosI } from '@/services/axios';
import productRequests from '@/util/requests/products/productsRequests';
import imageDefault from '@/assets/copoHome.jpg';
import { IStock } from '@/util/requests/products/stockRequests';
import { useAuth } from './useAuth';
export interface IProductBasic {
  id: number;
  name: string;
  image: string;
  price: string;
}
export interface IProductInsert {
  id: number;
  name: string;
  image: string;
  price: number;
  cupSizeId: number;
  flavoursIds: number[];
  complementsIds: number[];
  toppingsIds: number[];
  fruitId: number;
  plusIds: number[];
}
export type TStockObj = { stock: IStock };

export interface IProductById {
  id: number;
  name: string;
  image: string;
  price: string;
  cupSizeId: number;
  cupSize: IStock;
  stock: TStockObj[];
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

interface ProductsAndCategories {
  products: IProductBasic[];
  categories: ICategory[];
}

interface ProductsContextType {
  productsAndCategories: ProductsAndCategories | null;
  updateIsFavorited: (productId: number) => void;
  keyRequestProduct: boolean;
  setKeyRequestProduct: (value: boolean) => void;
  getFavoritedsProducts: (
    signOut: () => void
  ) => Promise<IProductBasic[] | null>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [productsAndCategories, setProductsAndCategories] =
    useState<ProductsAndCategories | null>(null);
  const [keyRequestProduct, setKeyRequestProduct] = useState<boolean>(false);

  if (!productsAndCategories) getProductsAndCategories();

  async function getProductsAndCategories() {
    axiosI
      .get('/products')
      .then(({ data }) => {
        setProductsAndCategories(data);
      })
      .catch(err => {
        const MOCK_ARR: ProductsAndCategories = {
          categories: [
            { id: 2, name: 'sabores de açaí', description: 'descrição foda' },
            { id: 3, name: 'adicionais', description: 'descrição foda' },
            { id: 4, name: 'caldas', description: 'descrição foda' }
          ],
          products: [
            {
              id: 1,
              name: 'produto 1',
              image: imageDefault,
              price: '27'
            },
            {
              id: 2,
              name: 'produto 2',
              image: imageDefault,
              price: '20'
            },
            {
              id: 3,
              name: 'produto 3',
              image: imageDefault,
              price: '17.20'
            }
          ]
        };

        setProductsAndCategories(MOCK_ARR);

        console.error('erro ao pegar produtos', err);
      });
  }

  async function updateIsFavorited(productId: number) {
    try {
      //await productRequests.updateIsFavorite(productId);
      setKeyRequestProduct(!keyRequestProduct);
    } catch (error) {
      return new Error('Erro ao atualizar favorito');
    }
  }
  async function getFavoritedsProducts(
    signOut: () => void
  ): Promise<IProductBasic[] | null> {
    return await productRequests.getFavoritedsByUserId(signOut);
  }
  return (
    <ProductsContext.Provider
      value={{
        productsAndCategories,
        updateIsFavorited,
        keyRequestProduct,
        setKeyRequestProduct,
        getFavoritedsProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProduct = (): ProductsContextType => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProduct deve ser usado dentro de um ProductProvider');
  }

  return context;
};
