import { useNavigate } from 'react-router-dom';
import { axiosI } from '../../services/axios';
import { ObjNewProduct } from '../../components/screens/Stock_Page/inputsRegisterProduct/InputsRegisterProduct';

interface SetObjNewProduct {
  (obj: ObjNewProduct): void;
}

async function requestRegisterProduct(
  objNewProduct: ObjNewProduct,
  setObjNewProduct: SetObjNewProduct,
  success: () => void
) {
  try {
    await axiosI.post(`/products`);
    success();
  } catch (err) {
    console.error(err);
    setObjNewProduct({ ...objNewProduct, price: '' });
  }
}

export default requestRegisterProduct;
