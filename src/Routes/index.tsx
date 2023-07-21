import { useAuth } from '@/hooks/useAuth';
import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import PopsicleLoading from '@/components/shared/Loaders/PopsicleLoading';
const Routes: React.FC = () => {
  const { userInfo, signed } = useAuth();
  if (userInfo?.permissions.access.includes('low')) {
    return <PrivateRoutes />;
  } else if (userInfo?.permissions.access.includes('high')) {
    return <AdministratorRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
