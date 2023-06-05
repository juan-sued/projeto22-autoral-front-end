import { HomeResponseAPI } from '../../components/screens/Home_Page/HomePage';
import { axiosI } from '../../services/axios';

function requestHomeContent(
  objHomeResponseAPI: HomeResponseAPI | null,
  setObjHomeResponseAPI: (value: HomeResponseAPI | null) => void,
  signOut: () => void
): void {
  axiosI
    .get(`/home-content`)
    .then(({ data }) => {
      setObjHomeResponseAPI(data);
    })
    .catch(err => console.error(err));
}

export default requestHomeContent;
