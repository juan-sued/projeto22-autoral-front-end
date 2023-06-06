import { useAuth } from '../hooks/useAuth';
import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const Routes: React.FC = () => {
  const { userInfo, signed } = useAuth();
  console.log('userInfo: ', userInfo, 'signed: ' + signed);
  if (signed && !userInfo?.isAdministrator) {
    return <PrivateRoutes />;
  } else if (signed && userInfo?.isAdministrator) {
    console.log('é administrador');
    return <AdministratorRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
