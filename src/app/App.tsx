import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '@/styles/globalStyles/globalStyles';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/hooks/useAuth';
import { ProductProvider } from '@/hooks/useProducts';
import Routes from '@/Routes';

const App: React.FC = () => {
  return (
    <CartProvider>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <Routes />
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
