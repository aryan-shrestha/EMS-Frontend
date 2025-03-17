import React, { useContext, useEffect } from "react";
import { CalendarCheck, Hourglass, LogIn, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import AuthContext from "@/context/AuthContext";
import CheckInBtn from "@/custom-components/Attendance/CheckInBtn";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";

import AttendanceChart from "@/custom-components/Attendance/AttendanceChart";
import WorkingHourChart from "@/custom-components/Attendance/WorkingHourChart";
import AttendanceTable from "@/custom-components/Attendance/AttendanceTable";
import { Attendance } from "@/types/interfaces";
import { GET } from "@/axios/instance";
import NepaliDate from "nepali-date-converter";

const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(":");
  let unit = Number(hour) > 12 ? "PM" : "AM";
  return `${hour} : ${minute} ${unit}`;
};

const AttendancePage = () => {
  const auth = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = React.useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState({
    year: new NepaliDate().getYear().toString(),
    month: (new NepaliDate().getMonth() + 1).toString(),
  });

  const fetchAttendanceData = async () => {
    setIsLoading(true);
    await GET(
      `attendance/my/`,
      {
        params: selectedDate,
      },
      (data: Attendance[]) => {
        setAttendanceData(data);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate]);

  const todayAttendance = attendanceData.find(
    (attendance) => attendance.date === NepaliDate.now().format("YYYY-MM-DD")
  );

  let checkInTime = formatTime(
    todayAttendance?.check_ins_outs?.[0]?.check_in ?? ""
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="md:col-span-2 xl:col-span-4">
        <Card className="shadow-none">
          <CardContent>
            <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
              <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                Good morning {auth?.userDetail?.first_name} !
              </h1>
              <CheckInBtn />
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <WidgetCard
          title="Check time"
          icon={LogIn}
          value={checkInTime}
          valueDescription="Today's Check-In time"
        />
      </div>
      <div>
        <WidgetCard
          title="Attendance"
          icon={CalendarCheck}
          value="-"
          valueDescription="No of days present in current month"
        />
      </div>
      <div>
        <WidgetCard
          title="Avg. working hour"
          icon={Timer}
          value="-"
          valueDescription="Average working hour of current month"
        />
      </div>
      <div>
        <WidgetCard
          title="Working hour"
          icon={Hourglass}
          value={todayAttendance?.total_working_hours.duration}
          valueDescription={`${todayAttendance?.total_working_hours.percentage}% of Working hour`}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
        <AttendanceChart />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
        <WorkingHourChart />
      </div>
      <div className="md:col-span-2 xl:col-span-4">
        <AttendanceTable
          attendanceData={attendanceData}
          isLoading={isLoading}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
