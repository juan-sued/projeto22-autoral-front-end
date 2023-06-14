import { ordersRouter } from '@/Routes/services/axios';

const requestOrder = async (orderData: any, signOut: any, success: any) => {
  try {
    const resp = await ordersRouter.post('/orders', orderData);
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
