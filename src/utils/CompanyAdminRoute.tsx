import { JSX, useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "@/context/AuthContext";

interface CompanyAdminRouteProps {
  children: JSX.Element;
}

export const CompanyAdminRoute = ({ children }: CompanyAdminRouteProps) => {
  const auth = useContext(AuthContext);

  if (auth?.user) {
    if (auth.employee?.is_company_admin) {
      return children;
    } else {
      return <Navigate to={"/"} />;
    }
  }
};
