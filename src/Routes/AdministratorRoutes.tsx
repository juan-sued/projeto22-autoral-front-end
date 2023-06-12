import { Routes, Route } from 'react-router-dom';
import Cart from '@/components/screens/Cart_Page/components';
import HomePage from '@/components/screens/Home_Page/HomePage';
import LoginPage from '@/components/screens/Login_Page/Login_Page';
import MyInformationPage from '@/components/screens/MyInformations_Page/MyInformation';
import RegisterPage from '@/components/screens/Register_Page/RegisterPage';
import React from 'react';
import StockPage from '@/components/screens/Stock_Page/StockPage';
import MakeOrderPage from '@/components/screens/MakeOrder_Page';

const AdministratorRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sign-up" element={<RegisterPage />} />
    <Route path="/sign-in" element={<LoginPage />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/my-informations-page" element={<MyInformationPage />} />
    <Route path="/stock" element={<StockPage />} />
    <Route path="/make-order" element={<MakeOrderPage />} />
  </Routes>
);
export default AdministratorRoutes;
