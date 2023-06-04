import { axiosI } from '../../services/axios';

async function requestFavoriteds(favoritedsList, setFavoritedsList, signOut) {
  axiosI
    .get(`/favoriteds`)
    .then(({ data }) => {
      setFavoritedsList([...favoritedsList, data]);
    })
    .catch(err => console.error(err));
}

export default requestFavoriteds;
