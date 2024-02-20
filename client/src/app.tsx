import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/error";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import User from "./routes/user";
import PollingDetail from "./routes/pollingDetail";
import "./app.css";

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
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/polling/:pollingId",
    element: <PollingDetail />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
