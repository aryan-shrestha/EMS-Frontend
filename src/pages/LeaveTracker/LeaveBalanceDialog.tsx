import axios from "@/axios/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RouteModal from "@/custom-components/Dialog/Dialog";
import { LeaveBalance } from "@/types/interfaces/LeaveTrackerTypes";
import { Loader2 } from "lucide-react";
import React from "react";

const LeaveBalanceDialog: React.FC = () => {
  const [leaveBalances, setLeaveBalances] = React.useState<LeaveBalance[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`leave-tracker/leave-balances/`);
        setLeaveBalances(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <RouteModal
      routePath="/leave-tracker/leave-balance"
      title="Leave balance"
      description="Below is your leave balance"
    >
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          {" "}
          <Loader2 className="animate-spin" />{" "}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Leave Types</TableHead>
              <TableHead>Quota</TableHead>
              <TableHead>Consumed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveBalances.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableHead>{item.leave_type.name}</TableHead>
                  <TableCell>{item.quota} days</TableCell>
                  <TableCell>{item.leaves_taken} days</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </RouteModal>
  );
};

export default LeaveBalanceDialog;
