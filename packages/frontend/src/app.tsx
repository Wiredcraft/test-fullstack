import { BrowserRouter } from 'react-router-dom';
import AppRouters from './routers';

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;
