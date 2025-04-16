import { GET, PUT } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvisibleInput from "@/custom-components/InvisibleInput/InvisibleInput";
import { showToast } from "@/lib/toast";
import { Employee } from "@/types/interfaces/Employee";
import { Check, Edit, Loader2, X } from "lucide-react";
import React from "react";

interface BasicInformationProps {
  employeeId: string | number | undefined;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ employeeId }) => {
  const [employee, setEmployee] = React.useState<Employee | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

  const getEmployee = React.useCallback(async () => {
    if (!employeeId) return;
    await GET(`employees/${employeeId}/`, {}, (data: Employee) => {
      setEmployee(data);
    });
  }, [employeeId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    let payload = {
      id: employee?.id,
      first_name: employee?.first_name,
      last_name: employee?.last_name,
      email: employee?.email,
    };
    setIsEditable(false);
    await PUT(`employees/${employeeId}/`, payload, (data: Employee) => {
      setEmployee(data);
      setIsEditable(false);
      showToast("Employee updated", "success");
    });
    setIsLoading(false);
  };

  React.useEffect(() => {
    getEmployee();
  }, [employeeId]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Basic information</CardTitle>
          {isEditable ? (
            <div className="space-x-2">
              <Button
                variant={"default"}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Check />}
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              >
                <X />
              </Button>
            </div>
          ) : (
            <Button
              variant={"secondary"}
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Edit />}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="First name"
              value={employee?.first_name ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmployee((prev) =>
                  prev ? { ...prev, first_name: event.target.value } : prev
                );
              }}
              isEditable={isEditable}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="First name"
              value={employee?.last_name ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmployee((prev) =>
                  prev ? { ...prev, last_name: event.target.value } : prev
                );
              }}
              isEditable={isEditable}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="Email"
              value={employee?.email ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmployee((prev) =>
                  prev ? { ...prev, email: event.target.value } : prev
                );
              }}
              isEditable={isEditable}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
