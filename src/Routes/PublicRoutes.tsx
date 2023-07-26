import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importar os componentes usando lazy
const Cart = lazy(() => import('@/components/screens/Cart_Page/components'));
const HomePage = lazy(() => import('@/components/screens/Home_Page/HomePage'));
const LoginPage = lazy(
  () => import('@/components/screens/Login_Page/Login_Page')
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

const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sign-in" element={<LoginPage />} />
    <Route path="/sign-up" element={<RegisterPage />} />
    <Route path="/make-order" element={<MakeOrderPage />} />
    <Route path="/product/:id" element={<ProductViewPage />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default PublicRoutes;
