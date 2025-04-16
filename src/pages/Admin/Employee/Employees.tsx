import { GET } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmationModal from "@/custom-components/modals/DeleteConfirmationModal";
import Table, { Column } from "@/custom-components/Table/Table";
import { Employee } from "@/types/interfaces/Employee";

import { CirclePlus, Edit, Trash } from "lucide-react";

import React from "react";
import { Link } from "react-router";
import EmployeeAddForm from "./EmployeeAdd";
import { Badge } from "@/components/ui/badge";

const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { openModal, closeModal } = useModal();

  const fetchEmployees = async () => {
    setIsLoading(true);
    GET(`employees/`, {}, (data: Employee[]) => {
      setEmployees(data);
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const columns: Column<Employee>[] = [
    { key: "first_name", header: "First name" },
    { key: "last_name", header: "Last name" },
    { key: "email", header: "Email" },
    {
      key: "is_active",
      header: "Status",
      render(value, _) {
        return (
          <Badge variant={value ? "default" : "outline"}>
            {value ? "Active" : "In-active"}
          </Badge>
        );
      },
    },
    {
      key: "id",
      header: "",
      render(id, row) {
        return (
          <div className="flex justify-end">
            <Button asChild variant={"ghost"} className="me-2">
              <Link to={`/admin/employees/${id}`}>
                <Edit size={18} />
              </Link>
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                openModal({
                  title: "Delete confirmation",
                  description: "",
                  content: (
                    <DeleteConfirmationModal
                      entityName="Employee"
                      endpoint={`employees/${row.id}`}
                      onClose={() => {
                        closeModal();
                      }}
                      onConfirm={() => {
                        fetchEmployees();
                      }}
                    />
                  ),
                });
              }}
            >
              <Trash size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Employees list</CardTitle>
            <Button
              variant={"default"}
              size={"sm"}
              onClick={() => {
                openModal({
                  title: "Add new employee",
                  description:
                    "Fill in the mandatory fields, and click invite. User gets email invitation sent to the email id mentioned. Once the invitation is accepted, the user becomes part of the organization.",
                  content: <EmployeeAddForm onsubmit={fetchEmployees} />,
                });
              }}
            >
              <CirclePlus />
              Employee
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[580px]">
            {
              <Table<Employee>
                columns={columns}
                data={employees}
                isLoading={isLoading}
              />
            }

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <span>{employees.length} employees records found</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </>
  );
};

export default Employees;
