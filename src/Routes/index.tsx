import { useAuth } from '@/hooks/useAuth';
import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const Routes: React.FC = () => {
  const { userInfo, signed } = useAuth();
  if (signed && !userInfo?.isAdministrator) {
    return <PrivateRoutes />;
  } else if (signed && userInfo?.isAdministrator) {
    return <AdministratorRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
