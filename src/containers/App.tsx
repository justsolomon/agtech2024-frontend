import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from 'types';
import { DriverPage } from 'pages';
import store from 'redux/store';
import 'leaflet/dist/leaflet.css';
import 'styles/main.scss';

const App = () => {
  const routes = [{ path: ROUTES.DRIVER, element: <DriverPage /> }];

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};
export default App;
