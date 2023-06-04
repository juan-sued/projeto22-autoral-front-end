import { axiosI } from '../../services/axios';

async function requestHomeContent(objHomeResponseAPI, setObjHomeResponseAPI, signOut) {
  axiosI
    .get(`/home-content`)
    .then(({ data }) => {
      setObjHomeResponseAPI([...objHomeResponseAPI, data]);
    })
    .catch(err => console.error(err));
}

export default requestHomeContent;
