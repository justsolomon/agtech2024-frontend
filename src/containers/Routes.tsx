import { useAuth } from 'hooks';
import {
  DriverMapPage,
  DriverSchedulePage,
  FarmerMapPage,
  HomePage,
} from 'pages';
import { useEffect } from 'react';
import {
  Routes as BrowserRoutes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ROUTES } from 'types';

const Routes = () => {
  const { userType } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { path: ROUTES.HOME, element: <HomePage /> },
    { path: ROUTES.DRIVER_MAP, element: <DriverMapPage /> },
    { path: ROUTES.FARMER_MAP, element: <FarmerMapPage /> },
    { path: ROUTES.DRIVER_SCHEDULE, element: <DriverSchedulePage /> },
  ];

  useEffect(() => {
    if (!userType && location.pathname !== ROUTES.HOME) {
      navigate(ROUTES.HOME);
    }
  }, [userType, location]);

  return (
    <BrowserRoutes>
      {routes.map((route) => (
        <Route {...route} />
      ))}
    </BrowserRoutes>
  );
};

export default Routes;
