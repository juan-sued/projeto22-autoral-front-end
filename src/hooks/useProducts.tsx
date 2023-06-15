import { createContext, useContext, useEffect, useState } from 'react';
import { productsRouter } from '@/Routes/services/axios';
import productRequests from '@/util/requests/products/productsRequests';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isFavorited: boolean;
  description: string;
  amount: number;
  unitOfMeasure: string;
  quantityForUnity: number;
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
  updateIsFavorited: (productId: number) => void;
  keyRequestProduct: boolean;
  setKeyRequestProduct: (value: boolean) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [keyRequestProduct, setKeyRequestProduct] = useState<boolean>(false);

  const [productsAndCategories, setProductsAndCategories] =
    useState<ProductsAndCategories>({
      productsList: [],
      categoriesList: []
    });

  useEffect(() => {
    productsRouter
      .get('/')
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
              name: 'Açaí da Ana',
              price: 2.5,
              image: '',
              category: 'produto x',
              isFavorited: false,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            },
            {
              id: 2,
              name: 'Açaí da Alessandra',
              price: 2.5,
              image: '',
              category: 'produto y',
              isFavorited: false,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            },
            {
              id: 3,
              name: 'morango',
              price: 2.5,
              image: '',
              category: 'produto z',
              isFavorited: true,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            },
            {
              id: 4,
              name: 'chocolate',
              price: 2.5,
              image: '',
              category: 'produto z',
              isFavorited: true,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            },
            {
              id: 5,
              name: 'morango',
              price: 2.5,
              image: '',
              category: 'produto z',
              isFavorited: true,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            },
            {
              id: 6,
              name: 'menta',
              price: 2.5,
              image: '',
              category: 'produto z',
              isFavorited: true,
              description: '1 Litro',
              amount: 12,
              unitOfMeasure: 'ml',
              quantityForUnity: 700
            }
          ]
        };

        setProductsAndCategories(testArr);

        console.error('erro ao pegar produtos', err);
      });
  }, [keyRequestProduct]);

  async function updateIsFavorited(productId: number) {
    try {
      await productRequests.updateIsFavorite(productId);
      setKeyRequestProduct(!keyRequestProduct);
    } catch (error) {
      const productsUpdated: ProductsAndCategories = {
        ...productsAndCategories
      };

      console.log(productsAndCategories);
      const newProductsWithFavorited = productsUpdated.productsList.map(
        product => {
          if (product.id === productId) {
            return {
              ...product,
              isFavorited: !product.isFavorited
            };
          }
          return product;
        }
      );
      console.log(newProductsWithFavorited);

      setProductsAndCategories({
        ...productsAndCategories,
        productsList: newProductsWithFavorited
      });

      console.log('erro ao atualizar favorito', error);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        productsAndCategories,
        updateIsFavorited,
        keyRequestProduct,
        setKeyRequestProduct
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
