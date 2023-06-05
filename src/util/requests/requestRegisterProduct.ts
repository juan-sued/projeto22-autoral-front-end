import { useNavigate } from 'react-router-dom';
import { axiosI } from '../../services/axios';
import { ObjNewProduct } from '../../components/screens/Stock_Page/inputsRegister/InputsRegisterProduct';

interface SetObjNewProduct {
  (obj: ObjNewProduct): void;
}

async function requestRegisterProduct(
  objNewProduct: ObjNewProduct,
  setObjNewProduct: SetObjNewProduct
) {
  const navigate = useNavigate();

  try {
    await axiosI.post(`/products`);
    navigate('/success-register');
  } catch (err) {
    console.error(err);
    setObjNewProduct({ ...objNewProduct, price: '' });
  }
}

export default requestRegisterProduct;
