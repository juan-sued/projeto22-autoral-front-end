import { axiosI } from '../../services/axios';

const requestOfertDay = async (objResponseAPI, setObjResponseAPI, signOut) => {
  try {
    const promisse = await axiosI.get('/ofert-day');
    if (promisse.status === 200) {
      setObjResponseAPI({ ...objResponseAPI, ofertOfDay: promisse.data });
    }
  } catch (err) {
    if (err.response.status === 401) {
      signOut();
    }
    console.log(err);
  }
};

export default requestOfertDay;
