import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Table, { Column } from "@/custom-components/Table/Table";
import { Transaction } from "@/types/interfaces";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import React from "react";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isLoading,
}) => {
  const columns: Column<Transaction>[] = [
    { key: "date", header: "Date" },
    { key: "net_salary", header: "Amount" },
    {
      key: "status",
      header: "Status",
      render(value, _) {
        return value == "complete" ? (
          <Badge variant={"default"}>Success</Badge>
        ) : (
          <Badge variant={"secondary"}>Pending</Badge>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="capitalize">Transactions</span>
        </CardTitle>
        <CardDescription>Transactions for 2081</CardDescription>
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
          ) : transactions.length === 0 ? (
            <div>No transactions found.</div>
          ) : (
            <Table<Transaction> columns={columns} data={transactions} />
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <small>{transactions.length} transactions found</small>
      </CardFooter>
    </Card>
  );
};

export default TransactionTable;
