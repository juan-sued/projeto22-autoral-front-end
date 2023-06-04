import { axiosI } from '../../services/axios';

const requestMoreOrders = async (objResponseAPI, setObjResponseAPI, signOut) => {
  try {
    const promisse = await axiosI.get('/more-orders');
    if (promisse.status === 200) {
      setObjResponseAPI({ ...objResponseAPI, moreOrders: promisse.data });
    }
  } catch (err) {
    if (err.response.status === 401) {
      signOut();
    }
    console.log(err);
  }
};

export default requestMoreOrders;
