import { createContext, useContext, useState } from 'react';
import { axiosI } from '../services/axios';
import { Product } from './useProducts';

interface CartContextType {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  updateProductAmount: ({
    productId,
    amount
  }: {
    productId: number;
    amount: number;
  }) => Promise<void>;
  removeProduct: (productId: number) => void;
  setCart: (cart: Product[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('gellatoCart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  async function addProduct(productId: number) {
    try {
      const cartUpdated = [...cart];

      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );

      const stockProductAmount = await axiosI
        .get(`/products/${productId}`)
        .then(({ data }) => data.availables);

      const currentAmountProduct = foundProductInCart
        ? foundProductInCart.amount
        : 0;
      const amountProduct = currentAmountProduct + 1;

      if (amountProduct > stockProductAmount) {
        console.log('Quantidade solicitada fora de estoque');
        return;
      }

      if (foundProductInCart) {
        foundProductInCart.amount++;
      } else {
        const product = await axiosI
          .get(`/products/${productId}`)
          .then(({ data }) => data);

        const newProduct: Product = {
          ...product,
          amount: 1
        };

        cartUpdated.push(newProduct);
      }

      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch (error) {
      console.log('error', error);
    }
  }

  async function updateProductAmount({
    productId,
    amount
  }: {
    productId: number;
    amount: number;
  }) {
    try {
      if (amount <= 0) return;

      const stockProductAmount = await axiosI
        .get(`/products/${productId}`)
        .then(({ data }) => data.availables);

      if (amount > stockProductAmount) {
        console.log('Quantidade solicitada fora de estoque');
        return;
      }

      const cartUpdated = [...cart];

      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );

      if (foundProductInCart) {
        foundProductInCart.amount = amount;
        setCart(cartUpdated);
        localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
      } else {
        throw Error();
      }
    } catch {
      console.log('Erro na alteração de quantidade do produto');
    }
  }

  function removeProduct(productId: number) {
    try {
      const cartUpdated = [...cart];

      const indexProductCart = cartUpdated.findIndex(
        product => product.id === productId
      );

      if (indexProductCart >= 0) {
        cartUpdated.splice(indexProductCart, 1);
        setCart(cartUpdated);
        localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
      } else {
        throw Error();
      }
    } catch {
      console.log('Erro na remoção do produto');
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, updateProductAmount, removeProduct, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }

  return context;
};
