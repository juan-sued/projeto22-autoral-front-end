import { useAuth } from '@/hooks/useAuth';
import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const Routes: React.FC = () => {
  const { userInfo } = useAuth();
  if (userInfo?.permissions.access.includes('low')) {
    return <PrivateRoutes />;
  } else if (userInfo?.permissions.access.includes('high')) {
    return <AdministratorRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
