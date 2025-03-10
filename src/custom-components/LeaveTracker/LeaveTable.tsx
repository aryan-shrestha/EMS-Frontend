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
import { LeaveRequest } from "@/types/interfaces"; // Ensure this interface is well-defined

import axios from "@/axios/instance";
import NepaliDate from "nepali-date-converter";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
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

const currentNepaliDate = new NepaliDate(new Date());

const getNepaliYears = (): number[] => {
  const currentYear = new NepaliDate(new Date()).getYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const LeaveTable: React.FC = () => {
  const [leavesList, setLeavesList] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [year, setYear] = useState<string>(
    currentNepaliDate.getYear().toString()
  );

  const nepaliYears = useMemo(() => getNepaliYears(), []);

  const fetchLeaveRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<LeaveRequest[]>(
        `/leave-tracker/?year=${year}` // Add year and month filters to the API call
      );
      setLeavesList(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("Error occurred while fetching leave requests.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [year]);

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
            // Replace with a better loading indicator
            <div
              className="flex justify-center items-center h-[200px] md:h-[250px] xl:h-[350px]"
              aria-label="Loading attendance data"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : leavesList.length === 0 ? (
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
                {leavesList.map((leave) => (
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
        <small>{leavesList.length} leave requests</small>
      </CardFooter>
    </Card>
  );
};

export default LeaveTable;
