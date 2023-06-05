import { Product } from '../../hooks/useProducts';
import { axiosI } from '../../services/axios';

function requestGetProducts(
  searchProduct: { searchBar: string },
  setResponseProducts: (value: Product[]) => void
): void {
  axiosI
    .get(`/products/product?name=${searchProduct.searchBar}`)
    .then(({ data }) => {
      setResponseProducts(data);
    })
    .catch(err => {
      console.error(err);
      setResponseProducts([
        {
          id: 1,
          name: 'e',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 1,
          isFavorited: false,
          description: '1 Litro',
          amount: 2
        },
        {
          id: 2,
          name: 'banana',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 2,
          isFavorited: false,
          description: '1 Litro',
          amount: 2
        },
        {
          id: 3,
          name: 'morango',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 3,
          isFavorited: true,
          description: '1 Litro',
          amount: 2
        },
        {
          id: 4,
          name: 'chocolate',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 4,
          isFavorited: true,
          description: '1 Litro',
          amount: 2
        },
        {
          id: 5,
          name: 'morango',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 5,
          isFavorited: true,
          description: '1 Litro',
          amount: 2
        },
        {
          id: 6,
          name: 'menta',
          price: 2.5,
          image: 'https://asdasdasdasdasd',
          categoryId: 7,
          isFavorited: true,
          description: '1 Litro',
          amount: 2
        }
      ]);
    });
}

export default requestGetProducts;
