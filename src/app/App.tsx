import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '@/styles/globalStyles/globalStyles';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/hooks/useAuth';
import { ProductProvider } from '@/hooks/useProducts';
import Routes from '@/Routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <ProductProvider>
            <Routes />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
