import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "@/components/ui/hover-card";
import { Attendance } from "@/types/interfaces";
import axios from "@/axios/instance";
import { toast } from "sonner";
import NepaliDate from "nepali-date-converter";

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

const TimeComponent = ({ time }: { time: string | null | undefined }) => (
  <span>
    {time ? new Date(`1970-01-01T${time}Z`).toLocaleTimeString() : "-"}
  </span>
);

const AttendanceStatusBadge = ({ isPresent }: { isPresent: boolean }) => (
  <Badge variant={isPresent ? "default" : "secondary"}>
    {isPresent ? "Present" : "Absent"}
  </Badge>
);

const AttendanceTable: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new NepaliDate().getYear().toString(),
    month: (new NepaliDate().getMonth() + 1).toString(),
  });

  const fetchAttendanceList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Attendance[]>(`attendance/my/`, {
        params: selectedDate,
      });
      setAttendanceData(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching attendance data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceList();
  }, [selectedDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
        <CardDescription>
          Attendance for {nepaliMonths[parseInt(selectedDate.month) - 1]}.
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
        <ScrollArea className="h-[350px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remote</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map(
                  ({
                    date,
                    total_working_hours,
                    is_remote,
                    check_ins_outs,
                  }) => {
                    const isPresent = total_working_hours.duration !== "-";
                    return (
                      <TableRow key={date}>
                        <TableCell>{date}</TableCell>
                        <TableCell>{total_working_hours.duration}</TableCell>
                        <TableCell>
                          <AttendanceStatusBadge isPresent={isPresent} />
                        </TableCell>
                        <TableCell>
                          {isPresent ? (
                            <Badge
                              variant={is_remote ? "secondary" : "default"}
                            >
                              {is_remote ? "Remote" : "In-site"}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger className="cursor-pointer">
                              View Details
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Attendance Detail</DialogTitle>
                              </DialogHeader>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-semibold">
                                      Date
                                    </TableCell>
                                    <TableCell>{date}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-semibold">
                                      Status
                                    </TableCell>
                                    <TableCell>
                                      <AttendanceStatusBadge
                                        isPresent={isPresent}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-semibold">
                                      Location
                                    </TableCell>
                                    <TableCell>
                                      {isPresent ? (
                                        <Badge
                                          variant={
                                            is_remote ? "secondary" : "default"
                                          }
                                        >
                                          {is_remote ? "Remote" : "In-site"}
                                        </Badge>
                                      ) : (
                                        "-"
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-semibold">
                                      Working Hours
                                    </TableCell>
                                    <TableCell>
                                      {isPresent ? (
                                        <HoverCard>
                                          <HoverCardTrigger>
                                            <Progress
                                              value={
                                                total_working_hours.percentage
                                              }
                                            />
                                          </HoverCardTrigger>
                                          <HoverCardContent>
                                            {total_working_hours.duration}
                                          </HoverCardContent>
                                        </HoverCard>
                                      ) : (
                                        "-"
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                              {check_ins_outs.length > 0 ? (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Check In</TableHead>
                                      <TableHead>Check Out</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {check_ins_outs.map(
                                      ({ id, check_in, check_out }) => (
                                        <TableRow key={id}>
                                          <TableCell>
                                            <TimeComponent time={check_in} />
                                          </TableCell>
                                          <TableCell>
                                            <TimeComponent time={check_out} />
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              ) : (
                                <small className="text-center">
                                  No check-in data found.
                                </small>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        Total present days: {attendanceData[0]?.total_present_days || 0}
      </CardFooter>
    </Card>
  );
};

export default AttendanceTable;
