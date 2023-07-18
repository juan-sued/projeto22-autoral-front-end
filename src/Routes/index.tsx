import { useAuth } from '@/hooks/useAuth';
import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const Routes: React.FC = () => {
  const { userInfo, signed } = useAuth();
  if (signed && userInfo?.permissions.access === 'low') {
    return <PrivateRoutes />;
  } else if (signed && userInfo?.permissions.access === 'high') {
    return <AdministratorRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
