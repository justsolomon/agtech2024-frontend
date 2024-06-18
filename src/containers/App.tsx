import Routes from './Routes';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'redux/store';
import 'leaflet/dist/leaflet.css';
import 'styles/main.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </Provider>
  );
};
export default App;
