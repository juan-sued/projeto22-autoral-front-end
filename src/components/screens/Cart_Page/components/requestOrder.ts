import { axiosI } from '@/services/axios';
import { OrderData } from '.';

const requestOrder = async (
  orderData: OrderData,
  signOut: () => void,
  success: () => void
) => {
  try {
    const resp = await axiosI.post('/products/orders', orderData);

    if (resp.status === 201) success();
  } catch (err: any) {
    if (err.response.status === 401) signOut();

    console.log(err);
  }
};

export default requestOrder;
