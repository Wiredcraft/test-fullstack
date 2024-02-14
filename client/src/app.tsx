import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/error";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
