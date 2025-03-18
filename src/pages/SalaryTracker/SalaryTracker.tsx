import { GET } from "@/axios/axios";
import { Card, CardContent } from "@/components/ui/card";
import AuthContext from "@/context/AuthContext";
import WidgetCard from "@/custom-components/WidgetCard/WidgetCard";
import { Salary, Transaction } from "@/types/interfaces";
import { IndianRupee, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import TransactionTable from "./TransactionTable";

const SalaryTracker: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const [salaryDetail, setSalaryDetail] = React.useState<Salary | undefined>(
    undefined
  );
  const [isSalaryDetailLoading, setIsSalaryDetailLoading] =
    React.useState<boolean>(false);

  const [transactionList, setTransactionList] = React.useState<Transaction[]>(
    []
  );
  const [isTransactionListLoading, setIsTransactionListLoading] =
    React.useState<boolean>(false);

  const fetchSalaryDetail = async () => {
    setIsSalaryDetailLoading(true);
    await GET(
      `/salary-management/salaries/${auth?.userDetail?.employee_id}/`,
      {},
      (data: Salary) => {
        setSalaryDetail(data);
        setIsSalaryDetailLoading(false);
      }
    );
  };

  const fetchTransactionList = async () => {
    setIsTransactionListLoading(true);
    await GET(
      "/salary-management/salary-transactions/",
      {},
      (data: Transaction[]) => {
        setTransactionList(data);
        setIsTransactionListLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchSalaryDetail();
    fetchTransactionList();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card className="shadow-none md:col-span-2 xl:col-span-4">
        <CardContent>
          <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
              Good morning {auth?.userDetail?.first_name} !
            </h1>
          </div>
        </CardContent>
      </Card>
      <WidgetCard
        title="Basic salary"
        icon={IndianRupee}
        value={
          isSalaryDetailLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            `Rs. ${salaryDetail?.basic_salary.toString()}`
          )
        }
        valueDescription="Basic salary of employee"
      />
      <WidgetCard
        title="Remote salary"
        icon={IndianRupee}
        value={
          isSalaryDetailLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            `Rs. ${salaryDetail?.remote_salary.toString()}`
          )
        }
        valueDescription="Salary while working remotely"
      />
      <WidgetCard
        title="Net salary"
        icon={IndianRupee}
        value="-"
        valueDescription="Salary after deducting leaves + tax"
      />
      <WidgetCard
        title="Incentives"
        icon={IndianRupee}
        value="-"
        valueDescription="Incentives/bonus rewared to employee"
      />
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-4">
        <TransactionTable
          transactions={transactionList}
          isLoading={isTransactionListLoading}
        />
      </div>
    </div>
  );
};

export default SalaryTracker;
