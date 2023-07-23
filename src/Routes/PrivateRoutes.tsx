import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Cart = lazy(() => import('@/components/screens/Cart_Page/components'));
const HomePage = lazy(() => import('@/components/screens/Home_Page/HomePage'));
const LoginPage = lazy(
  () => import('@/components/screens/Login_Page/Login_Page')
);
const MyInformationPage = lazy(
  () => import('@/components/screens/MyInformations_Page/MyInformation')
);
const RegisterPage = lazy(
  () => import('@/components/screens/Register_Page/RegisterPage')
);
const MakeOrderPage = lazy(() => import('@/components/screens/MakeOrder_Page'));
const ProductViewPage = lazy(
  () => import('@/components/screens/Product_View_Page/index')
);
const NotFoundPage = lazy(
  () => import('@/components/screens/Errors/MessageNotFound')
);

const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sign-in" element={<LoginPage />} />
    <Route path="/sign-up" element={<RegisterPage />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/my-informations-page" element={<MyInformationPage />} />
    <Route path="/make-order" element={<MakeOrderPage />} />
    <Route path="/product/:id" element={<ProductViewPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default PrivateRoutes;
