import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";

import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";
import { CalendarCheck, CalendarX2, Hourglass } from "lucide-react";
import LeaveTable from "@/custom-components/LeaveTracker/LeaveTable";

const LeaveTracker: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="shadow-none md:col-span-2 xl:col-span-4">
          <CardContent>
            <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
              <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                Good morning {auth?.userDetail?.first_name} !
              </h1>
              <Button asChild>
                <Link to={"take-leave"}>Take a leave</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <WidgetCard
          title="Total leaves"
          icon={CalendarX2}
          value="12 days"
          valueDescription={"Total no of leaves this year"}
        />
        <WidgetCard
          title="Pending"
          icon={Hourglass}
          value="2 days"
          valueDescription={"Total pending leaves approvals"}
        />
        <WidgetCard
          title="Approved"
          icon={CalendarCheck}
          value="10 days"
          valueDescription={"Total approved leaves"}
        />
        <WidgetCard
          title="Available"
          icon={CalendarCheck}
          value="10 days"
          valueDescription={"Total approved leaves"}
        />
        <div className="md:col-span-2 xl:col-span-4">
          <LeaveTable />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LeaveTracker;
