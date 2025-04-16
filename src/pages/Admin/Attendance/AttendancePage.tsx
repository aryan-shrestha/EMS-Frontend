import { GET } from "@/axios/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Table, { Column } from "@/custom-components/Table/Table";

import { Attendance } from "@/types/interfaces";
import {
  CheckCircle,
  CircleAlert,
  ClockAlert,
  CloudSnow,
  Edit,
} from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NepaliDate from "nepali-date-converter";

const getDuration = (duration: string) => {
  let date_gte = "";
  let date_lte = "";

  if (duration === "today") {
    date_gte = NepaliDate.now().format("YYYY-MM-DD");
    date_lte = NepaliDate.now().format("YYYY-MM-DD");
  } else if (duration === "yesterday") {
    const lteDate = new Date();
    lteDate.setDate(lteDate.getDate() - 1);
    const gteDate = new Date();
    gteDate.setDate(gteDate.getDate() - 1);

    date_lte = NepaliDate.fromAD(lteDate).format("YYYY-MM-DD");
    date_gte = NepaliDate.fromAD(gteDate).format("YYYY-MM-DD");
  } else if (duration === "last7Days") {
    const lteDate = new Date();
    const gteDate = new Date();
    gteDate.setDate(gteDate.getDate() - 7);
    date_lte = NepaliDate.fromAD(lteDate).format("YYYY-MM-DD");
    date_gte = NepaliDate.fromAD(gteDate).format("YYYY-MM-DD");
  } else if (duration === "last30Days") {
    const lteDate = new Date();
    const gteDate = new Date();
    gteDate.setDate(gteDate.getDate() - 30);
    date_lte = NepaliDate.fromAD(lteDate).format("YYYY-MM-DD");
    date_gte = NepaliDate.fromAD(gteDate).format("YYYY-MM-DD");
  }
  return { date_gte, date_lte };
};

const AttendancePage: React.FC = () => {
  const [attendances, setAttendances] = React.useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [duration, setDuration] = React.useState("today");

  const getAttendance = async () => {
    const { date_gte, date_lte } = getDuration(duration);
    setIsLoading(true);
    try {
      await GET(
        `attendances/`,
        // { date_gte: "2081-12-01", date_lte: "2081-12-30", employee: 3 },
        { date_gte: date_gte, date_lte: date_lte },
        (data: Attendance[]) => {
          setAttendances(data);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Attendance>[] = [
    {
      key: "date",
      header: "Date",
    },
    {
      key: "employee",
      header: "Employee",
      render(_, row) {
        return (
          <span className="capitalize font-medium">
            {row.employee.first_name} {row.employee.last_name}
          </span>
        );
      },
    },
    {
      key: "check_ins_outs",
      header: "Status",
      render(_, row) {
        return (
          <span className="capitalize font-medium">
            {row.check_ins_outs.length === 0 ? (
              <Badge variant={"destructive"}>Absent</Badge>
            ) : (
              <Badge>Present</Badge>
            )}
          </span>
        );
      },
    },
    {
      key: "check_ins_outs",
      header: "Check in",
      render(_, row) {
        return (
          <span className="capitalize font-medium">
            {row.check_ins_outs.length !== 0 ? (
              <span>{row.check_ins_outs[0].check_in}</span>
            ) : (
              <span>-</span>
            )}
          </span>
        );
      },
    },
    {
      key: "check_ins_outs",
      header: "Check out",
      render(_, row) {
        return (
          <span className="capitalize font-medium">
            {row.check_ins_outs.length !== 0 && (
              <span>{row.check_ins_outs[-1]?.check_in ?? "-"}</span>
            )}
          </span>
        );
      },
    },
    {
      key: "total_working_hours",
      header: "Total working hour",
      render(_, row) {
        return (
          <span className="capitalize font-medium">
            {row.total_working_hours.duration}
          </span>
        );
      },
    },
    {
      key: "id",
      header: "",
      render(value, _) {
        return (
          <span className="capitalize font-medium">
            <Button variant={"secondary"}>
              <Edit />
            </Button>
          </span>
        );
      },
    },
  ];

  React.useEffect(() => {
    getAttendance();
  }, [duration]);

  return (
    <div className="grid grid-cols-4 gap-6">
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="tracking-tight text-sm font-medium">
              Present
            </CardTitle>
            <span>
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">8</span>
          <p className="text-xs text-muted-foreground mt-2">
            No of present employees
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="tracking-tight text-sm font-medium">
              Late check-ins
            </CardTitle>
            <span>
              <ClockAlert className="h-5 w-5 text-muted-foreground" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">8</span>
          <p className="text-xs text-muted-foreground mt-2">
            No of late check-ins
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="tracking-tight text-sm font-medium">
              Uninformed
            </CardTitle>
            <span>
              <CircleAlert className="h-5 w-5 text-muted-foreground" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">02</span>
          <p className="text-xs text-muted-foreground mt-2">
            No of uninformed absentes
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="tracking-tight text-sm font-medium">
              On leave
            </CardTitle>
            <span>
              <CloudSnow className="h-5 w-5 text-muted-foreground" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">06</span>
          <p className="text-xs text-muted-foreground mt-2">
            No of employees on leave
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendances</CardTitle>
            <div className="flex items-center justify-between">
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7Days">Last 7 days</SelectItem>
                    <SelectItem value="last30Days">Last 30 Days</SelectItem>
                    <SelectItem value="pineapple">This Month</SelectItem>
                    <SelectItem value="pineapple">Last Month</SelectItem>
                    <SelectItem value="pineapple">Custom Range</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[480px]">
            {
              <Table<Attendance>
                columns={columns}
                data={attendances}
                isLoading={isLoading}
              />
            }
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
