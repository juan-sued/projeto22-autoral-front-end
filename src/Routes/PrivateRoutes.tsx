import { Routes, Route } from 'react-router-dom';
import Cart from '../components/screens/Cart_Page/components';
import HomePage from '../components/screens/Home_Page/HomePage';
import LoginPage from '../components/screens/Login_Page/Login_Page';
import MyInformationPage from '../components/screens/MyInformations_Page/MyInformation';
import RegisterPage from '../components/screens/Register_Page/RegisterPage';

const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route path={'/'} element={<HomePage />} />
    <Route path={'/sign-in'} element={<LoginPage />} />
    <Route path={'/sign-up'} element={<RegisterPage />} />
    <Route path={'/cart'} element={<Cart />} />
    <Route path={'/my-informations-page'} element={<MyInformationPage />} />
  </Routes>
);
export default PrivateRoutes;
/*

 aqui vão as rotas de myProfile, myOrders



 */
