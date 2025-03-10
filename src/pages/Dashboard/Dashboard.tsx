import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  Hourglass,
  IndianRupee,
  Info,
  Timer,
} from "lucide-react";

import AuthContext from "@/context/AuthContext";
import AttendanceContext from "@/context/AttendanceContext";

import CheckInBtn from "@/custom-components/Attendance/CheckInBtn";
import AttendanceTable from "@/custom-components/Attendance/AttendanceTable";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";
import Chart from "@/custom-components/Attendance/AttendanceChart";
import WorkingHourChart from "@/custom-components/Attendance/WorkingHourChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LeaveTable from "@/custom-components/LeaveTracker/LeaveTable";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const attendanceContext = useContext(AttendanceContext);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="shadow-none md:col-span-2 xl:col-span-4">
          <CardContent>
            <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
              <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                Good morning {auth?.userDetail?.first_name} !
              </h1>
              <CheckInBtn
                isAttendanceLoading={attendanceContext?.isAttendanceLoading}
                attendance={attendanceContext?.attendance}
              />
            </div>
          </CardContent>
        </Card>
        <div>
          <WidgetCard
            title="Attendance"
            icon={CalendarCheck}
            value={`${attendanceContext?.attendance?.total_present_days} days`}
            valueDescription="No of days present in current month"
          />
        </div>
        <div>
          <WidgetCard
            title="Avg. working hour"
            icon={Timer}
            value={`${attendanceContext?.attendance?.average_working_hour}`}
            valueDescription="Average working hour of current month"
          />
        </div>
        <div>
          <WidgetCard
            title="Salary"
            icon={IndianRupee}
            value="Rs. 15420"
            valueDescription="-15% of total salary"
          />
        </div>
        <div>
          <WidgetCard
            title="Working hour"
            icon={Hourglass}
            value={attendanceContext?.attendance?.total_working_hours.duration}
            valueDescription={`${attendanceContext?.attendance?.total_working_hours.percentage}% of Working hour`}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <Chart />
        </div>
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <WorkingHourChart />
        </div>
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <TabsDemo />
        </div>
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <AttendanceTable />
        </div>
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <LeaveTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export function TabsDemo() {
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notices">
              <Info />
              Notices
            </TabsTrigger>
            <TabsTrigger value="events">
              <CalendarCheck />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notices" className={cn("mt-4")}>
            <ScrollArea className={cn("h-[350px]")}>
              <Card className={cn("mb-4")}>
                <CardContent>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="font-semibold">Monthly end meeting</span>
                    <small>2081-11-30</small>
                  </div>
                </CardContent>
              </Card>
              <Card className={cn("mb-4")}>
                <CardContent>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="font-semibold">Monthly end meeting</span>
                    <small>2081-11-30</small>
                  </div>
                </CardContent>
              </Card>
              <Card className={cn("mb-4")}>
                <CardContent>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="font-semibold">Monthly end meeting</span>
                    <small>2081-11-30</small>
                  </div>
                </CardContent>
              </Card>
              <Card className={cn("mb-4")}>
                <CardContent>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="font-semibold">Monthly end meeting</span>
                    <small>2081-11-30</small>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="events" className={cn("mt-4")}>
            <Card className={cn("mb-4")}>
              <CardContent>
                <div className="flex flex-col justify-between gap-2">
                  <span className="font-semibold">Mahashivaratri</span>
                  <small>2081-11-14</small>
                </div>
              </CardContent>
            </Card>
            <Card className={cn("mb-4")}>
              <CardContent>
                <div className="flex flex-col justify-between gap-2">
                  <span className="font-semibold">Fagu Poornima</span>
                  <small>2081-11-29</small>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
