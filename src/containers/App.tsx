import { Provider } from 'react-redux';
import store from 'redux/store';
import 'styles/main.scss';

const App = () => <Provider store={store}>App</Provider>;

export default App;
