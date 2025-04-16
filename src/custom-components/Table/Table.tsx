import React from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];

  isLoading?: boolean;
}

const Table = <T,>({ columns, data, isLoading }: TableProps<T>) => {
  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={`${column}-${index}`}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`skeleton-${column}-${index}`}>
                  <Skeleton className="w-[80%] h-[40px] rounded-full" />
                </TableCell>
              ))}
            </TableRow>
          </>
        ) : data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, index) => (
                <TableCell
                  key={`${String(column.key)}-${index}`}
                  className={cn("py-4")}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </ShadcnTable>
  );
};

export default Table;
