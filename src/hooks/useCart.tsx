import { createContext, useContext, useState } from 'react';
import { IProductById, IProductInsert } from './useProducts';

interface UpdateProductAmount {
  productId: number | string;
  amount: number;
}

interface CartContextType {
  addProductExiting: (productAdd: IProductById) => Promise<void>;
  addProductOrderInCart: (objectNewOrder: IProductInsert) => void;
  updateProductAmount: ({
    productId,
    amount
  }: UpdateProductAmount) => Promise<void>;
  removeAllProductsSelecteds: (productsIds: (number | string)[]) => void;
  cart: CartProduct[];

  setCart: (cart: CartProduct[]) => void;
}

export interface CartProduct extends IProductInsert {
  amountInCart: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storagedCart = localStorage.getItem('gellatoCart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });
  console.log('carrinho:', cart);

  async function addProductOrderInCart(objectNewOrder: IProductInsert) {
    try {
      const cartUpdated: CartProduct[] = [...cart];
      const foundProductInCart = cartUpdated.find(
        product => product.id === objectNewOrder.id
      );

      if (foundProductInCart) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        foundProductInCart.amountInCart++;
      } else {
        // Se o produto não estiver no carrinho, adicione um novo item
        const newProduct: CartProduct = {
          ...objectNewOrder,
          amountInCart: 1
        };
        cartUpdated.push(newProduct);
      }

      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch (error) {
      console.log('error', error);
    }
  }

  async function addProductExiting(productAdd: IProductById): Promise<void> {
    // responsavel formatar o produto e enviar para addProductOrder
    try {
      const newProduct: IProductInsert = {
        id: productAdd.id,
        name: productAdd.name,
        image: productAdd.image,
        price: Number(productAdd.price),
        cupSizeId: productAdd.cupSizeId,
        fruitsId: productAdd.stock['Frutas']?.map(stock => stock.id) ?? [],
        flavoursIds: productAdd.stock['Sabores']?.map(stock => stock.id) ?? [],
        complementsIds:
          productAdd.stock['Complementos']?.map(stock => stock.id) ?? [],
        toppingsIds: productAdd.stock['Caldas']?.map(stock => stock.id) ?? [],
        plusIds: productAdd.stock['Adicionais']?.map(stock => stock.id) ?? []
      };

      addProductOrderInCart(newProduct);
    } catch (error) {
      if (error) console.log('Erro ao formatar produto', error);
    }
  }

  async function updateProductAmount({
    productId,
    amount
  }: {
    productId: number | string;
    amount: number;
  }) {
    try {
      if (amount <= 0) return;

      const cartUpdated = [...cart];

      const foundProductInCart = cartUpdated.find(
        product => product.id === productId
      );

      if (!foundProductInCart)
        throw Error('produto não encontrado no carrinho');

      foundProductInCart.amountInCart = amount;
      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch {
      console.log('Erro na alteração de quantidade do produto');
    }
  }

  async function removeAllProductsSelecteds(productIds: (number | string)[]) {
    try {
      const cartUpdated = cart.filter(
        product => !productIds.includes(product.id)
      );
      setCart(cartUpdated);
      localStorage.setItem('gellatoCart', JSON.stringify(cartUpdated));
    } catch (error) {
      console.log('Error removing products:', error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductExiting,
        updateProductAmount,
        removeAllProductsSelecteds,
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
