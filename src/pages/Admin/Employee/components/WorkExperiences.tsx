import { GET } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkExperience } from "@/types/interfaces/Employee";
import { Edit, Plus, Trash2 } from "lucide-react";
import Table, { Column } from "@/custom-components/Table/Table";

import React from "react";
import { useModal } from "@/context/ModalContext";
import WorkExperienceForm from "./WorkExperienceForm";
import WorkExperienceUpdateForm from "./WorkExperienceUpdateForm";
import DeleteConfirmationModal from "@/custom-components/modals/DeleteConfirmationModal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface WorkExperienceFormProps {
  employeeId: number | string | undefined;
}

const WorkExperiences: React.FC<WorkExperienceFormProps> = ({ employeeId }) => {
  const [workExperiences, setWorkExperiences] = React.useState<
    WorkExperience[]
  >([]);
  const { openModal, closeModal } = useModal();

  const getWorkExperience = async () => {
    await GET(
      `employees/work-experiences/${employeeId}`,
      {},
      (data: WorkExperience[]) => {
        setWorkExperiences(data);
      }
    );
  };

  React.useEffect(() => {
    employeeId && getWorkExperience();
  }, [employeeId]);

  const columns: Column<WorkExperience>[] = [
    { key: "job_title", header: "Job Title" },
    { key: "company_name", header: "Header" },
    { key: "from_date", header: "From date" },
    { key: "to_date", header: "To date" },
    {
      key: "id",
      header: "",
      render(value, _) {
        return (
          <div className="flex justify-end items-center space-x-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                openModal({
                  title: "Edit working experience",
                  content: (
                    <WorkExperienceUpdateForm
                      workExperienceId={value}
                      fetchWorkExperience={getWorkExperience}
                    />
                  ),
                });
              }}
            >
              <Edit />
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-destructive"
              onClick={() => {
                openModal({
                  title: "Delete Confirmaton",
                  content: (
                    <DeleteConfirmationModal
                      onClose={closeModal}
                      onConfirm={() => {
                        getWorkExperience();
                        closeModal();
                      }}
                      entityName="Work Experience"
                      endpoint={`employees/work-experiences/details/${value}/`}
                    />
                  ),
                });
              }}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Work experience</CardTitle>
          <Button
            variant={"secondary"}
            onClick={() => {
              openModal({
                title: "Add work experience",
                description:
                  "Fill the form below to add previous work experience for the employee",
                content: (
                  <WorkExperienceForm
                    employeeId={employeeId}
                    fetchWorkExperience={getWorkExperience}
                  />
                ),
              });
            }}
          >
            <Plus strokeWidth={3} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-max-[320px]">
          <Table<WorkExperience> columns={columns} data={workExperiences} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkExperiences;
