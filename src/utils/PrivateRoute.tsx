import AuthContext from "@/context/AuthContext";
import { JSX, useContext } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth?.user) return <Navigate to="/login" />;

  if (auth.user.employee === null)
    return <Navigate to="/organization/register" />;

  if (auth.user.employee) {
    if (adminOnly && !auth.user.employee.is_company_admin)
      return <Navigate to={"/"} />;
    if (!adminOnly && auth.user.employee.is_company_admin)
      return <Navigate to={"/admin"} />;
    if (adminOnly && auth.user.employee.is_company_admin) return children;
    if (!adminOnly && !auth.user.employee.is_company_admin) return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
