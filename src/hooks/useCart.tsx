import { createContext, useContext, useState } from 'react';
import { axiosI, productsRouter } from '@/services/axios';
import { Product } from './useProducts';
import { objNewOrderParams } from '@/components/screens/MakeOrder_Page';
import productRequests, {
  ProductCustomized
} from '@/util/requests/products/productsRequests';

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextType {
  addProduct: (productId: number) => Promise<void>;
  addProductOrder: (
    objectNewOrder: objNewOrderParams
  ) => Promise<string[] | undefined>;
  updateProductAmount: ({
    productId,
    amount
  }: UpdateProductAmount) => Promise<void>;
  removeProduct: (productId: number) => void;
  cart: (CartProduct | CartProductCustomized)[];

  setCart: (cart: (CartProduct | CartProductCustomized)[]) => void;
}

interface CartProductCustomized extends ProductCustomized {
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

  async function addProductOrder(objectNewOrder: objNewOrderParams) {
    //envia obj pro back, back retorna um cartProduct
    try {
      const result: ProductCustomized | string[] =
        await productRequests.postRegisterProductCustomized(objectNewOrder);
      if (Array.isArray(result)) return result;

      const cartUpdated: (CartProduct | CartProductCustomized)[] = [...cart];

      const foundProductInCart = cartUpdated.find(
        product => product.id === result.id
      );

      if (foundProductInCart) {
        const updatedProduct = { ...foundProductInCart };
        updatedProduct.amountInCart++;
        const index = cartUpdated.indexOf(foundProductInCart);
        cartUpdated[index] = updatedProduct;
      } else {
        const CartProductCustomized: CartProductCustomized = {
          ...result,
          amountInCart: 1
        };
        cartUpdated.push(CartProductCustomized);
      }

      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch (error) {
      console.log('error', error);
    }
  }

  async function addProduct(productId: number) {
    try {
      const cartUpdated = [...cart];
      //verifica se ja tem o produto no carrinho
      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );
      const product: Product = (await productsRouter.get('/' + productId)).data;

      const currentAmountProduct = foundProductInCart
        ? foundProductInCart.amountInCart
        : 0;

      const amountProduct = currentAmountProduct + 1;
      if (amountProduct > product.amount) {
        alert('Quantidade solicitada fora de estoque');
        return;
      }
      if (foundProductInCart) {
        foundProductInCart.amountInCart++;
      } else {
        const product = await axiosI
          .get(`${productId}`)
          .then(({ data }) => data);

        const newProduct: CartProduct = {
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
        addProductOrder
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
