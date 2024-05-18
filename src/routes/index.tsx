// routes.tsx
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import { useAuth } from "../providers/AuthProvider";

const Private = ({ element }: { element: JSX.Element }) => {
  const { isAuth } = useAuth();
  return !isAuth ? <Navigate to="/login" /> : element;
};

export const router = [
  {
    path: "/",
    element: <Private element={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "*",
    element: <Private element={<Home />} />,
  },
];
