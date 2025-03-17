import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Loader2 } from "lucide-react";

import { Attendance } from "@/types/interfaces";
import NepaliDate from "nepali-date-converter";
import Table, { Column } from "../Table/Table";

const nepaliMonths = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const getNepaliYears = () => {
  const currentYear = new NepaliDate().getYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const TimeComponent = ({ time }: { time: string | null | undefined }) => {
  if (!time) return <span>-</span>;
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return <span>{date.toLocaleTimeString()}</span>;
};

const IsRemoteStatusBadge = ({
  isRemote,
  shiftCoverage,
}: {
  isRemote: boolean;
  shiftCoverage: number;
}) => {
  let isPresent = shiftCoverage > 30;
  if (isPresent && isRemote) {
    return <Badge variant={"secondary"}>Remote</Badge>;
  } else if (isPresent && !isRemote) {
    return <Badge variant={"default"}>In-Site</Badge>;
  } else {
    return <>-</>;
  }
};

const AttendanceStatusBadge = ({
  shiftCoverage,
}: {
  shiftCoverage: number;
}) => (
  <Badge variant={shiftCoverage > 30 ? "default" : "secondary"}>
    {shiftCoverage > 30 ? "Present" : "Absent"}
  </Badge>
);

interface AttendanceTableProps {
  attendanceData: Attendance[];
  isLoading: boolean;
  selectedDate: { year: string; month: string };
  setSelectedDate: ({ year, month }: { year: string; month: string }) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceData,
  isLoading,
  selectedDate,
  setSelectedDate,
}) => {
  const columns: Column<Attendance>[] = [
    { key: "date", header: "Date" },
    {
      key: "check_in_lat",
      header: "Check in",
      render(_, row) {
        return <TimeComponent time={row.check_ins_outs[0]?.check_in} />;
      },
    },
    {
      key: "check_out_lat",
      header: "Check Out",
      render(_, row) {
        let lastIndex = row.check_ins_outs.length - 1;
        return (
          <TimeComponent time={row.check_ins_outs[lastIndex]?.check_out} />
        );
      },
    },
    {
      key: "check_ins_outs",
      header: "Status",
      render(_, row) {
        return (
          <AttendanceStatusBadge
            shiftCoverage={row.total_working_hours.percentage}
          />
        );
      },
    },
    {
      key: "is_remote",
      header: "Is remote",
      render(_, row) {
        return (
          <IsRemoteStatusBadge
            isRemote={row.is_remote}
            shiftCoverage={row.total_working_hours.percentage}
          />
        );
      },
    },
    {
      key: "total_working_hours",
      header: "Total working hour",
      render(_, row) {
        return row.total_working_hours.duration;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
        <CardDescription>
          Attendance for {nepaliMonths[parseInt(selectedDate?.month) - 1]}
        </CardDescription>
        <form className="flex gap-4 pt-2">
          <Select
            value={selectedDate.year}
            onValueChange={(year) => setSelectedDate({ ...selectedDate, year })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {getNepaliYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedDate.month}
            onValueChange={(month) =>
              setSelectedDate({ ...selectedDate, month })
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {nepaliMonths.map((month, index) => (
                <SelectItem key={index} value={`${index + 1}`}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[200px] md:h-[250px] xl:h-[350px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Table<Attendance> columns={columns} data={attendanceData} />
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;
