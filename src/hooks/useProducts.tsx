import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosI } from '../services/axios';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

interface ProductsAndCategories {
  productsList: Product[];
  categoriesList: Category[];
}

interface ProductsContextType {
  productsAndCategories: ProductsAndCategories;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [productsAndCategories, setProductsAndCategories] =
    useState<ProductsAndCategories>({
      productsList: [],
      categoriesList: []
    });
  const navigate = useNavigate();

  useEffect(() => {
    axiosI
      .get('/products')
      .then(({ data }) => {
        setProductsAndCategories(data);
      })
      .catch(err => {
        const testArr: ProductsAndCategories = {
          categoriesList: [
            { id: 2, name: 'sabores de açaí' },
            { id: 3, name: 'adicionais' },
            { id: 4, name: 'caldas' }
          ],
          productsList: [
            {
              id: 1,
              name: 'e',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 1
            },
            {
              id: 2,
              name: 'banana',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 2
            },
            {
              id: 3,
              name: 'morango',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 3
            },
            {
              id: 4,
              name: 'chocolate',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 4
            },
            {
              id: 5,
              name: 'morango',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 4
            },
            {
              id: 6,
              name: 'menta',
              price: '2,50',
              image: 'https://asdasdasdasdasd',
              categoryId: 4
            }
          ]
        };

        setProductsAndCategories(testArr);

        console.error(err);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ productsAndCategories }}>
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
