import { JSX, useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "@/context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  return auth?.user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
