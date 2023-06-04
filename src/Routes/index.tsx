import AdministratorRoutes from './AdministratorRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const Routes: React.FC = () => {
  const userInfo = false;
  const signed = false;

  if (signed) {
    return <AdministratorRoutes />;
  } else if (userInfo) {
    return <PrivateRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
