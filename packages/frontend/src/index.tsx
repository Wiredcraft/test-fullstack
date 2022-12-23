import ReactDOM from 'react-dom/client';
import App from './app';

// 局部更新
if (module && module.hot) {
  module.hot.accept();
}

const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error('Root element not found in index.html');
}

ReactDOM.createRoot(rootElement).render(<App />);
