import { App } from 'containers';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);

serviceWorkerRegistration.unregister();
