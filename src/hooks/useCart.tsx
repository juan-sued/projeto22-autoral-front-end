import { createContext, useContext, useState } from 'react';
import { axiosI } from '../services/axios';
import { Product } from './useProducts';
import productRequests from '../util/requests/products/productsRequests';
import { objNewOrderParams } from '../components/screens/MakeOrder_Page';
import {
  CheckAllProductsAvailability,
  checkAllProductsAvailability
} from '../util/utilsFunctions';

interface CartContextType {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  addProductOrder: (
    objectNewOrder: objNewOrderParams
  ) => Promise<CheckAllProductsAvailability>;
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

  async function addProductOrder(objectNewOrder: objNewOrderParams) {
    try {
      const result = await checkAllProductsAvailability(objectNewOrder);
      if (result) {
        return result;
      } else {
        throw new Error('Failed to check product availability.'); // Lança um erro caso o resultado seja undefined
      }
    } catch (error) {
      console.log('error', error);
      return { availables: [], unavailables: [] }; // Valor padrão a ser retornado em caso de erro
    }
  }

  async function addProduct(productId: number) {
    try {
      const cartUpdated = [...cart];
      //verifica se ja tem o produto no carrinho
      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );
      const stockProductAmount = await axiosI
        .get(`/products/${productId}`)
        .then(({ data }) => data.availables);

      //pega a quantidade atual do produto no carrinho
      const currentAmountProduct = foundProductInCart
        ? foundProductInCart.amount
        : 0;

      const amountProduct = currentAmountProduct + 1;
      //se a quantidade do produto no escolhido for maior que stock ==> quantidade insuficiente
      if (amountProduct > stockProductAmount) {
        alert('Quantidade solicitada fora de estoque');
        return;
      }
      //se ja tiver o produto no stock, ele pega a quantidade que ja tem + 1
      if (foundProductInCart) {
        foundProductInCart.amount++;
      } else {
        //senão tiver, ele puxa os dados do produto com a quantidade 1
        const product = await axiosI
          .get(`/products/${productId}`)
          .then(({ data }) => data);

        const newProduct: Product = {
          ...product,
          amount: 1
        };
        //adiciona o produto novo no cart atualizado
        cartUpdated.push(newProduct);
      }
      //atualiza o carrinho
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
      value={{
        cart,
        addProduct,
        updateProductAmount,
        removeProduct,
        setCart,
        addProductOrder
      }}
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
