import { CalendarCheck, CalendarX2, Hourglass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";
import LeaveTable from "@/custom-components/LeaveTracker/LeaveTable";
import NepaliDate from "nepali-date-converter";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, Outlet } from "react-router";
import axios from "@/axios/instance";
import { isAxiosError } from "axios";
import AuthContext from "@/context/AuthContext";
import {
  LeaveBalance,
  LeaveRequest,
} from "@/types/interfaces/LeaveTrackerTypes";
import { toast } from "sonner";

const currentNepaliDate = new NepaliDate(new Date());

const LeaveTracker: React.FC = () => {
  const auth = useContext(AuthContext);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [isLeaveRequestsLoading, setLeaveRequestLoading] =
    useState<boolean>(false);
  const [isLeavebalanceLoading, setIsLeavebalanceLoading] =
    useState<boolean>(false);

  const [year, setYear] = useState<string>(
    currentNepaliDate.getYear().toString()
  );

  const calculateLeaveStats = useMemo(() => {
    let totalLeaveQuota = 0;
    let availableLeaves = 0;
    let totalLeavesTaken = 0;
    let pendingLeaves = 0;
    let approvedLeaves = 0;

    leaveBalances.forEach((item) => {
      totalLeavesTaken += item.leaves_taken;
      totalLeaveQuota += item.quota;
    });
    availableLeaves = totalLeaveQuota - totalLeavesTaken;

    leaveRequests.forEach((item) => {
      if (item.is_approved) {
        approvedLeaves += 1;
      }
      if (!item.is_reviewed) {
        pendingLeaves += 1;
      }
    });

    return {
      totalLeaveQuota,
      availableLeaves,
      totalLeavesTaken,
      pendingLeaves,
      approvedLeaves,
    };
  }, [leaveBalances, leaveRequests]);

  const fetchLeaveRequest = async () => {
    try {
      setLeaveRequestLoading(true);
      const response = await axios.get<LeaveRequest[]>(
        `/leave-tracker/leave-requests/?year=${year}`
      );
      setLeaveRequests(response.data);
    } catch (err) {
      if (isAxiosError(err)) {
        toast(err.message || "Failed to fetch leave requests.");
      } else {
        toast("An unexpected error occurred.");
      }
      console.error("Error fetching leave requests:", err);
    } finally {
      setLeaveRequestLoading(false);
    }
  };

  const fetchLeaveBalances = async () => {
    try {
      setIsLeavebalanceLoading(true);
      const response = await axios.get<LeaveBalance[]>(
        `leave-tracker/leave-balances/`
      );
      setLeaveBalances(response.data);
    } catch (err) {
      if (isAxiosError(err)) {
        toast(err.message || "Failed to fetch leave balances.");
      } else {
        toast("An unexpected error occurred.");
      }
      console.error("Error fetching leave balances:", err);
    } finally {
      setIsLeavebalanceLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequest();
  }, [year]);

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  const getDays = (value: number) => {
    return value === 1 ? `${value} day` : `${value} days`;
  };

  const { availableLeaves, approvedLeaves, pendingLeaves, totalLeavesTaken } =
    calculateLeaveStats;

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
          value={isLeavebalanceLoading ? "-" : `${getDays(totalLeavesTaken)}`}
          valueDescription={"Total no of leaves this year"}
        />
        <WidgetCard
          title="Pending"
          icon={Hourglass}
          value={isLeavebalanceLoading ? "-" : `${getDays(pendingLeaves)}`}
          valueDescription={"Total pending leaves requests"}
        />
        <WidgetCard
          title="Approved"
          icon={CalendarCheck}
          value={isLeavebalanceLoading ? "-" : `${getDays(approvedLeaves)}`}
          valueDescription={"Total approved leaves requests"}
        />
        <Link to={"leave-balance"}>
          <WidgetCard
            title="Available"
            icon={CalendarCheck}
            value={isLeavebalanceLoading ? "-" : `${getDays(availableLeaves)}`}
            valueDescription={"Total available leaves"}
          />
        </Link>

        <div className="md:col-span-2 xl:col-span-4">
          <LeaveTable
            leaveRequests={leaveRequests}
            isLoading={isLeaveRequestsLoading}
            year={year}
            setYear={setYear}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LeaveTracker;
