import { BrowserRouter, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import GlobalStyles from '@/styles/globalStyles/globalStyles';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/hooks/useAuth';
import { ProductProvider } from '@/hooks/useProducts';
import Routes from '@/Routes';
import LoadingPage from '@/components/shared/Loaders/LoadingPage';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <ProductProvider>
            <Suspense fallback={<LoadingPage />}>
              <Routes />
            </Suspense>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
