import { createContext, useContext, useState } from 'react';
import { axiosI, productsRouter } from '@/Routes/services/axios';
import { Product } from './useProducts';
import { objNewOrderParams } from '@/components/screens/MakeOrder_Page';

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextType {
  addProduct: (productId: number) => Promise<void>;
  addProductOrderInCart: (objectNewOrder: objNewOrderParams) => void;
  updateProductAmount: ({
    productId,
    amount
  }: UpdateProductAmount) => Promise<void>;
  removeProduct: (productId: number) => void;
  cart: (CartProduct | CartProductCustomized)[];

  setCart: (cart: (CartProduct | CartProductCustomized)[]) => void;
}

interface CartProductCustomized extends objNewOrderParams {
  id: number;
  amountInCart: number;
}

interface CartProduct extends Product {
  amountInCart: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cart, setCart] = useState<(CartProduct | CartProductCustomized)[]>(
    () => {
      const storagedCart = localStorage.getItem('gellatoCart');

      if (storagedCart) {
        return JSON.parse(storagedCart);
      }

      return [];
    }
  );

  async function addProductOrderInCart(objectNewOrder: objNewOrderParams) {
    try {
      const cartUpdated: (CartProduct | CartProductCustomized)[] = [...cart];

      const newProductCustomized: CartProductCustomized = {
        ...objectNewOrder,
        amountInCart: 1
      };
      cartUpdated.push(newProductCustomized);
      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch (error) {
      console.log('error', error);
    }
  }

  async function addProduct(productId: number) {
    try {
      const cartUpdated: (CartProduct | CartProductCustomized)[] = [...cart];
      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );
      if (!foundProductInCart) return alert('Produto não presente no carrinho');

      const updatedProduct = { ...foundProductInCart };

      updatedProduct.amountInCart++;
      const index = cartUpdated.indexOf(foundProductInCart);
      cartUpdated[index] = updatedProduct;

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

      const cartUpdated = [...cart];

      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );

      if (foundProductInCart) {
        foundProductInCart.amountInCart = amount;
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
        throw Error('aaa');
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
        addProductOrderInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }

  return context;
};
