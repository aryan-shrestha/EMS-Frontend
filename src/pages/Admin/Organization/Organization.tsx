import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthContext from "@/context/AuthContext";
import { showToast } from "@/lib/toast";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const Organization: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.message) {
      showToast(location.state.message, location.state.type);
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Basic details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col lg:col-span-2 xl:col-span-1">
            <span className="text-muted-foreground">Organization Name</span>
            <span>{auth?.user?.organization.name}</span>
          </div>
          <div className="flex flex-col lg:col-span-2 xl:col-span-1">
            <span className="text-muted-foreground">Organization type</span>
            <span>{auth?.user?.organization.type_of_organization}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Opening time</span>
            <span>{auth?.user?.organization.opening_time ?? "-"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Closing time</span>
            <span>{auth?.user?.organization.opening_time ?? "-"}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};

export default Organization;
