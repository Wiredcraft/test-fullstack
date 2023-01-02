import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './app';

if (module && module.hot) {
  module.hot.accept();
}

const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error('Root element not found in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
