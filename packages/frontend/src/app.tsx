import { RouterProvider } from 'react-router-dom';
import routers from './routers';
import './styles/app.css';

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
