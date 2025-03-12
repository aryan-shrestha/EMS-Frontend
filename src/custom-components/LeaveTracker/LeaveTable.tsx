import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import NepaliDate from "nepali-date-converter";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaveRequest } from "@/types/interfaces/LeaveTrackerTypes";

const getNepaliYears = (): number[] => {
  const currentYear = new NepaliDate(new Date()).getYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

interface LeaveTableProps {
  leaveRequests: LeaveRequest[];
  isLoading: boolean;
  year: string;
  setYear: (value: string) => void;
}

const LeaveTable: React.FC<LeaveTableProps> = ({
  leaveRequests,
  isLoading,
  year,
  setYear,
}) => {
  const nepaliYears = React.useMemo(() => getNepaliYears(), []);
  console.log(leaveRequests);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="capitalize">Leave requests</span>
        </CardTitle>
        <CardDescription>Leave requests for {year}</CardDescription>
        <form className="flex gap-4 pt-2">
          <Select value={year} onValueChange={setYear} disabled={isLoading}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {nepaliYears.map((year, index) => {
                return (
                  <SelectItem value={`${year}`} key={index}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </form>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] md:h-[250px] xl:h-[350px]">
          {isLoading ? (
            <div
              className="flex justify-center items-center h-[200px] md:h-[250px] xl:h-[350px]"
              aria-label="Loading attendance data"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : leaveRequests.length === 0 ? (
            <div>No leave requests found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Created at</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>No of days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests?.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell className="py-4">
                      {format(new Date(leave.created_at), "yyyy-MM-dd, HH:mm")}
                    </TableCell>
                    <TableCell className="py-4">{leave.subject}</TableCell>
                    <TableCell className="py-4">
                      {format(new Date(leave.from_date), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell className="py-4">{leave.no_days}</TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant={leave.is_approved ? "default" : "secondary"}
                      >
                        {leave.is_approved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size={"sm"}
                        onClick={() =>
                          console.log(`View leave request ${leave.id}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <small>{leaveRequests.length} leave requests</small>
      </CardFooter>
    </Card>
  );
};

export default LeaveTable;
