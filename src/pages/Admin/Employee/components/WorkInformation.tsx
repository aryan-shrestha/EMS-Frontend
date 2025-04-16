import { GET, PATCH } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvisibleInput from "@/custom-components/InvisibleInput/InvisibleInput";
import { WorkInformation } from "@/types/interfaces/Employee";
import {
  Department,
  Designation,
  EmploymentType,
  SourceOfHire,
} from "@/types/interfaces/Organization";
import { Check, Edit, Loader2, X } from "lucide-react";
import React from "react";

interface WorkInformationProps {
  workInformationId: string | number | undefined;
}

const WorkInformationForm: React.FC<WorkInformationProps> = ({
  workInformationId,
}) => {
  const [workInformation, setWorkInformation] = React.useState<
    WorkInformation | undefined
  >(undefined);
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [designations, setDesignations] = React.useState<Designation[]>([]);
  const [employmentTypes, setEmploymentTypes] = React.useState<
    EmploymentType[]
  >([]);
  const [sourceOfHires, setSourceOfHires] = React.useState<SourceOfHire[]>([]);

  const [isEditable, setIsEditable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getDeparments = async () => {
    await GET(`organizations/departments/`, {}, (data: Department[]) => {
      setDepartments(data);
    });
  };

  const getDesignations = async () => {
    await GET(`organizations/designations/`, {}, (data: Designation[]) => {
      setDesignations(data);
    });
  };

  const getEmployeementTypes = async () => {
    await GET(
      `organizations/employment-types/`,
      {},
      (data: EmploymentType[]) => {
        setEmploymentTypes(data);
      }
    );
  };

  const getSourceOfHires = async () => {
    await GET(`organizations/source-of-hires/`, {}, (data: SourceOfHire[]) => {
      setSourceOfHires(data);
    });
  };

  const getWorkInformation = React.useCallback(async () => {
    if (!workInformationId) return;
    await GET(
      `employees/work-informations/${workInformationId}`,
      {},
      (data: WorkInformation) => {
        setWorkInformation(data);
      }
    );
  }, [workInformationId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      date_of_joining: workInformation?.date_of_joining,
      department: workInformation?.department,
      designation: workInformation?.designation,
      employment_type: workInformation?.employment_type,
      source_of_hire: workInformation?.source_of_hire,
    };
    try {
      await PATCH(
        `/employees/work-informations/${workInformationId}/`,
        payload,
        (data: WorkInformation) => {
          setWorkInformation(data);
          setIsEditable(false);
        }
      );
    } catch (error) {
      setIsEditable(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getWorkInformation();
  }, [workInformationId]);

  React.useEffect(() => {
    getDeparments();
    getDesignations();
    getEmployeementTypes();
    getSourceOfHires();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Work information</CardTitle>
          {isEditable ? (
            <div className="space-x-2">
              <Button
                variant={"default"}
                onClick={() => {
                  handleSubmit();
                }}
                disabled={isLoading}
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
            <Label className="text-muted-foreground">Department</Label>
            <Select
              disabled={!isEditable}
              value={workInformation?.department?.toString() ?? ""}
              onValueChange={(value: string) => {
                setWorkInformation((prev) =>
                  prev ? { ...prev, department: parseInt(value) } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departments.map((department) => {
                    return (
                      <SelectItem
                        value={department.id.toString()}
                        key={department.id}
                      >
                        {department.department_name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <Label className="text-muted-foreground">Designation</Label>
            <Select
              disabled={!isEditable}
              value={workInformation?.designation?.toString() ?? ""}
              onValueChange={(value: string) => {
                setWorkInformation((prev) =>
                  prev ? { ...prev, designation: parseInt(value) } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select a designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {designations.map((designation) => {
                    return (
                      <SelectItem
                        value={`${designation.id}`}
                        key={designation.id}
                      >
                        {designation.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <Label className="text-muted-foreground">Employment type</Label>
            <Select
              disabled={!isEditable}
              value={workInformation?.employment_type?.toString() ?? ""}
              onValueChange={(value: string) => {
                setWorkInformation((prev) =>
                  prev ? { ...prev, employment_type: parseInt(value) } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select a employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {employmentTypes.map((employmentType) => {
                    return (
                      <SelectItem
                        value={`${employmentType.id}`}
                        key={employmentType.id}
                      >
                        {employmentType.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <Label className="text-muted-foreground">Source of hiring</Label>
            <Select
              disabled={!isEditable}
              value={workInformation?.source_of_hire?.toString() ?? ""}
              onValueChange={(value: string) => {
                setWorkInformation((prev) =>
                  prev ? { ...prev, source_of_hire: parseInt(value) } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sourceOfHires.map((source) => {
                    return (
                      <SelectItem value={`${source.id}`} key={source.id}>
                        {source.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="Date of joining"
              value={workInformation?.date_of_joining ?? "-"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setWorkInformation((prev) =>
                  prev ? { ...prev, date_of_joining: event.target.value } : prev
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

export default WorkInformationForm;
