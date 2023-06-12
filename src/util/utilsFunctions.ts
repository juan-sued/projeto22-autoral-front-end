import { Product } from '../hooks/useProducts';
import productRequests from './requests/products/productsRequests';

const incrementStarsFeedback = (stars: string): string[] => {
  const arrStars: string[] = [];
  const number: number = Number(stars[0]);
  const number2: number = Number(stars[2]);

  while (arrStars.length < 5) {
    if (arrStars.length < number) {
      arrStars.push('startFull');
    } else if (arrStars.length === number && number2 !== 0) {
      arrStars.push('middle');
    } else {
      arrStars.push('notpoint');
    }
  }

  return arrStars;
};

const increaseCardSizeToggle = (
  setStateCard: (state: boolean) => void,
  stateCard: boolean
): void => {
  setStateCard(!stateCard);
};

function calculateTotalPrice(ids: number[], products: Product[]): number {
  return ids
    .filter(productId => products.some(product => product.id === productId))
    .map(
      productId =>
        products.find(product => product.id === productId)?.price || 0
    )
    .reduce((accumulator, price) => accumulator + price, 0);
}

interface ProductsAvailablesCheck {
  id: number;
  name: string;
  quantity: number;
}

export interface CheckAllProductsAvailability {
  availables: ProductsAvailablesCheck[];
  unavailables: ProductsAvailablesCheck[];
}

async function checkAllProductsAvailability(
  products: any
): Promise<CheckAllProductsAvailability> {
  try {
    const availabilityList: ProductsAvailablesCheck[] = [];
    const unavailabilityList: ProductsAvailablesCheck[] = [];

    for (const key in products) {
      if (Array.isArray(products[key])) {
        for (const productId of products[key]) {
          const product = await productRequests.getProductById(productId);
          if (product.amount <= 0) {
            unavailabilityList.push({
              id: product.id,
              name: product.name,
              quantity: product.amount
            });
          } else {
            availabilityList.push({
              id: product.id,
              name: product.name,
              quantity: product.amount
            });
          }
        }
      } else {
        const product = await productRequests.getProductById(products[key]);
        if (product.amount <= 0) {
          unavailabilityList.push({
            id: product.id,
            name: product.name,
            quantity: product.amount
          });
        } else {
          availabilityList.push({
            id: products[key],
            name: product.name,
            quantity: product.amount
          });
        }
      }
    }

    const result: CheckAllProductsAvailability = {
      availables: availabilityList,
      unavailables: unavailabilityList
    };

    return result;
  } catch (error) {
    console.error('Erro ao verificar disponibilidade do estoque:', error);
    return {
      availables: [],
      unavailables: []
    };
  }
}

function formatListNames(arr: string[]): string {
  const names = arr.join(', ').replace(/,([^,]*)$/, ' e$1') + '.';
  return names;
}

export {
  incrementStarsFeedback,
  increaseCardSizeToggle,
  calculateTotalPrice,
  checkAllProductsAvailability,
  formatListNames
};
