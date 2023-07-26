import { createContext, useContext, useState } from 'react';
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
  fruitId: number | null;
  plusIds: number[];
}
export type TStockObj = { [categoryName: string]: IStock[] };

export interface IProductById {
  id: number;
  name: string;
  image: string;
  price: string;
  cupSizeId: number;
  cupSize: IStock;
  stock: TStockObj;
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
  setProductsAndCategories: (value: ProductsAndCategories | null) => void;
  keyRequest: boolean;
  setKeyRequest: (value: boolean) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [productsAndCategories, setProductsAndCategories] =
    useState<ProductsAndCategories | null>(null);
  const [keyRequest, setKeyRequest] = useState(false);

  async function getFavoritedsProducts(
    signOut: () => void
  ): Promise<IProductBasic[] | null> {
    return await productRequests.getFavoritedsByUserId(signOut);
  }
  return (
    <ProductsContext.Provider
      value={{
        productsAndCategories,
        setProductsAndCategories,
        keyRequest,
        setKeyRequest
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
