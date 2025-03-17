import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import NepaliDate from "nepali-date-converter";
import React from "react";

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
import Table, { Column } from "../../custom-components/Table/Table";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/context/ModalContext";
import LeaveRequestDetail from "./LeaveRequestDetail";

const getNepaliYears = (): number[] => {
  const currentYear = new NepaliDate(new Date()).getYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

interface LeaveTableProps {
  leaveRequests: LeaveRequest[];
  isLoading: boolean;
  year: string;
  setYear: (value: string) => void;
  refreshData: () => void;
}

const LeaveTable: React.FC<LeaveTableProps> = ({
  leaveRequests,
  isLoading,
  year,
  setYear,
  refreshData,
}) => {
  const nepaliYears = React.useMemo(() => getNepaliYears(), []);
  const { openModal } = useModal();

  const columns: Column<LeaveRequest>[] = [
    {
      key: "subject",
      header: "Subject",
      render(value, row) {
        return (
          <span
            className="font-medium underline underline-offset-4 cursor-pointer"
            onClick={() => {
              openModal({
                title: "Leave requests details",
                description: "",
                content: (
                  <LeaveRequestDetail
                    leaveRequestId={row.id}
                    onCancel={refreshData}
                  />
                ),
              });
            }}
          >
            {value}
          </span>
        );
      },
    },
    { key: "from_date", header: "Start date" },
    { key: "till_date", header: "End date" },
    {
      key: "is_reviewed",
      header: "Status",
      render(value, _) {
        return (
          <Badge variant={value ? "default" : "secondary"}>
            {value ? "Reviewed" : "Pending"}
          </Badge>
        );
      },
    },
    {
      key: "is_approved",
      header: "Is Approved",
      render(value, _) {
        return (
          <Badge variant={value ? "default" : "secondary"}>
            {value ? "Approved" : "Declined"}
          </Badge>
        );
      },
    },
    {
      key: "is_paid",
      header: "Status",
      render(value, _) {
        return (
          <Badge variant={value ? "default" : "secondary"}>
            {value ? "Paid" : "Unpaid"}
          </Badge>
        );
      },
    },
  ];

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
            <Table<LeaveRequest> columns={columns} data={leaveRequests} />
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <small>{leaveRequests.length} leave requests found</small>
      </CardFooter>
    </Card>
  );
};

export default LeaveTable;
