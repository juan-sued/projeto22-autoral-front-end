import { createContext, useContext, useState } from 'react';
import { axiosI } from '@/services/axios';
import productRequests from '@/util/requests/products/productsRequests';
import { IStock } from '@/util/requests/products/stockRequests';
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
  products: {
    notFavoriteds: IProductBasic[];
    favoriteds: IProductBasic[];
  };
  categories: ICategory[];
}

interface ProductsContextType {
  productsAndCategories: ProductsAndCategories | null;
  updateIsFavorited: (productId: number) => void;
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

  if (!productsAndCategories) getProductsAndCategories();

  async function getProductsAndCategories() {
    axiosI
      .get('/products/products-categories')
      .then(({ data }) => {
        setProductsAndCategories(data);
      })
      .catch(err => {
        const MOCK_ARR: ProductsAndCategories = {
          products: {
            notFavoriteds: [
              {
                id: 1,
                name: 'Exemplo de Pedido',
                image: 'fotoaquiasdiasda',
                price: '27'
              },
              {
                id: 2,
                name: 'Exemplo de Pedido',
                image: 'fotoaquiasdiasda',
                price: '17.5'
              }
            ],
            favoriteds: []
          },
          categories: [
            {
              id: 4,
              name: 'categoria 1',
              description: 'descrição categoria 1'
            },
            {
              id: 5,
              name: 'categoria 2',
              description: 'descrição categoria 2'
            },
            {
              id: 6,
              name: 'categoria 3',
              description: 'descrição categoria 3'
            },
            {
              id: 7,
              name: 'Caldas',
              description: 'Categoria para Caldas'
            },
            {
              id: 8,
              name: 'Frutas',
              description: 'Categoria para Frutas'
            },
            {
              id: 9,
              name: 'Complementos',
              description: 'Categoria para Complementos'
            },
            {
              id: 10,
              name: 'Adicionais',
              description: 'Categoria para Adicionais'
            },
            {
              id: 12,
              name: 'Tamanhos',
              description: 'Categoria para Tamanhos de copo'
            },
            {
              id: 11,
              name: 'Sabores',
              description: 'Categoria para Sabores de açaí.'
            }
          ]
        };

        setProductsAndCategories(MOCK_ARR);

        console.error('erro ao pegar produtos', err);
      });
  }

  async function updateIsFavorited(productId: number) {
    try {
      await productRequests.updateFavorited(productId);
      getProductsAndCategories();
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
