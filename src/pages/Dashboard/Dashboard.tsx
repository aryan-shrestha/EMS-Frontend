import React, { useContext, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  Hourglass,
  IndianRupee,
  Info,
  Loader2,
  Timer,
} from "lucide-react";

import AuthContext from "@/context/AuthContext";

import CheckInBtn from "@/custom-components/Attendance/CheckInBtn";
import AttendanceTable from "@/custom-components/Attendance/AttendanceTable";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";
import AttendanceChart from "@/custom-components/Attendance/AttendanceChart";
import WorkingHourChart from "@/custom-components/Attendance/WorkingHourChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import NepaliDate from "nepali-date-converter";

import { GET } from "@/axios/axios";
import {
  LeaveBalance,
  LeaveRequest,
} from "@/types/interfaces/LeaveTrackerTypes";
import LeaveTable from "@/pages/LeaveTracker/LeaveTable";
import { Attendance } from "@/types/interfaces";

const currentNepaliDate = new NepaliDate(new Date());

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = React.useState<any>([]);
  const [leaveRequests, setLeaveRequests] = React.useState<LeaveRequest[]>([]);
  const [_, setLeaveBalances] = React.useState<LeaveBalance[]>([]);
  const [attendanceList, setAttendanceList] = React.useState<Attendance[]>([]);

  const [isAttendanceDataLoading, setIsAttendanceDataLoading] =
    React.useState<boolean>(false);
  const [isAttendanceListLoading, setIsAttendanceListLoading] =
    React.useState<boolean>(false);
  const [isLeaveRequestsLoading, setLeaveRequestLoading] =
    React.useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState({
    year: new NepaliDate().getYear().toString(),
    month: (new NepaliDate().getMonth() + 1).toString(),
  });

  const [leaveReqestYear, setLeaveRequestYear] = React.useState<string>(
    currentNepaliDate.getYear().toString()
  );

  const fetchAttendanceData = async () => {
    setIsAttendanceDataLoading(true);
    await GET(
      `attendance/dashboard/`,
      { params: selectedDate },
      (data: any) => {
        setAttendanceData(data);
        setIsAttendanceDataLoading(false);
      }
    );
  };

  const fetchLeaveRequest = React.useCallback(async () => {
    setLeaveRequestLoading(true);
    await GET(
      `/leave-tracker/leave-requests/`,
      { year: leaveReqestYear },
      (data: LeaveRequest[]) => {
        setLeaveRequests(data);
        setLeaveRequestLoading(false);
      }
    );
  }, [leaveReqestYear]);

  const fetchAttendanceList = React.useCallback(async () => {
    setIsAttendanceListLoading(true);
    await GET(
      `attendance/my/`,
      {
        params: selectedDate,
      },
      (data: Attendance[]) => {
        setAttendanceList(data);
        setIsAttendanceListLoading(false);
      }
    );
  }, [selectedDate]);

  const fetchLeaveBalances = async () => {
    await GET(`leave-tracker/leave-balances/`, {}, (data: LeaveBalance[]) => {
      setLeaveBalances(data);
    });
  };

  useEffect(() => {
    fetchAttendanceList();
  }, [selectedDate]);

  useEffect(() => {
    fetchLeaveRequest();
  }, [leaveReqestYear]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card className="shadow-none md:col-span-2 xl:col-span-4">
        <CardContent>
          <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
              Good morning {auth?.user?.employee?.first_name} !
            </h1>
            <CheckInBtn />
          </div>
        </CardContent>
      </Card>
      <div>
        <WidgetCard
          title="Attendance"
          icon={CalendarCheck}
          value={
            isAttendanceDataLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              `${attendanceData?.present_days} days`
            )
          }
          valueDescription="No of days present in current month"
        />
      </div>
      <div>
        <WidgetCard
          title="Avg. working hour"
          icon={Timer}
          value={
            attendanceData?.avg_working_hour ?? (
              <Loader2 className="animate-spin" />
            )
          }
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
          value={
            attendanceData?.attendance?.total_working_hours?.duration ?? (
              <Loader2 className="animate-spin" />
            )
          }
          valueDescription={`${
            attendanceData?.attendance?.total_working_hours?.percentage ?? "-"
          }% of Working hour`}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
        <AttendanceChart
          attendanceData={attendanceData?.yearly_attendance}
          isLoading={isAttendanceDataLoading}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
        <WorkingHourChart
          attendanceData={attendanceData}
          isLoading={isAttendanceDataLoading}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
        <TabsDemo />
      </div>
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
        <AttendanceTable
          attendanceData={attendanceList}
          isLoading={isAttendanceListLoading}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
        <LeaveTable
          leaveRequests={leaveRequests}
          isLoading={isLeaveRequestsLoading}
          year={leaveReqestYear}
          setYear={setLeaveRequestYear}
          refreshData={() => {
            fetchLeaveBalances();
            fetchLeaveRequest();
          }}
        />
      </div>
    </div>
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
