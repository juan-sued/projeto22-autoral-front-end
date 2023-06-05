import { Product } from '../../hooks/useProducts';
import { axiosI } from '../../services/axios';

function requestFavoriteds(
  favoritedsList: Product[],
  setFavoritedsList: (value: Product[]) => void,
  signOut: () => void
): void {
  axiosI
    .get(`/favoriteds`)
    .then(({ data }) => {
      setFavoritedsList([...favoritedsList, data]);
    })
    .catch(err => console.error(err));
}

export default requestFavoriteds;
