import { JSX, useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "@/context/AuthContext";

interface EmployeeRouteProps {
  children: JSX.Element;
}

export const EmployeeRoute = ({ children }: EmployeeRouteProps) => {
  const auth = useContext(AuthContext);

  if (auth?.user) {
    if (!auth.employee?.is_company_admin) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
  return <Navigate to={"/login"} />;
};
