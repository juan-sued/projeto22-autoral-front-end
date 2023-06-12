import { axiosI } from '@/services/axios';

const requestOrder = async (orderData: any, signOut: any, success: any) => {
  try {
    const resp = await axiosI.post('/orders', orderData);
    if (resp.status === 201) {
      success();
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      signOut();
    }
    console.log(err);
  }
};

export default requestOrder;
