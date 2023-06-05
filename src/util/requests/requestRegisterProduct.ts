import { useNavigate } from 'react-router-dom';
import { axiosI } from '../../services/axios';
import { ObjNewProduct } from '../../components/screens/Stock_Page/inputsRegister/InputsRegisterProduct';

interface SetObjNewProduct {
  (obj: ObjNewProduct): void;
}

const navigate = useNavigate();

async function requestRegisterProduct(
  objNewProduct: ObjNewProduct,
  setObjNewProduct: SetObjNewProduct
) {
  try {
    await axiosI.post(`/products`);
    navigate('/success-register');
  } catch (err) {
    console.error(err);
    setObjNewProduct({ ...objNewProduct, price: '' });
  }
}

export default requestRegisterProduct;
