import React from "react";
import { Qualification } from "@/types/interfaces/Employee";
import { GET } from "@/axios/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Table, { Column } from "@/custom-components/Table/Table";
import { Edit, Plus, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useModal } from "@/context/ModalContext";
import QualificationAddForm from "./QualificationAddForm";
import DeleteConfirmationModal from "@/custom-components/modals/DeleteConfirmationModal";
import QualificationUpdateForm from "./QualificationUpdateForm";

interface QualificationsProps {
  employeeId: number | string | undefined;
}

const Qualifications: React.FC<QualificationsProps> = ({ employeeId }) => {
  const [qualifications, setQualifications] = React.useState<Qualification[]>(
    []
  );
  const { openModal, closeModal } = useModal();

  const fetchQualifications = async () => {
    await GET(
      `/employees/qualifications/${employeeId}/`,
      {},
      (data: Qualification[]) => {
        setQualifications(data);
      }
    );
  };

  React.useEffect(() => {
    employeeId && fetchQualifications();
  }, [employeeId]);

  const columns: Column<Qualification>[] = [
    { key: "degree", header: "Degree" },
    { key: "college", header: "University/College" },
    { key: "field_of_study", header: "Field of study" },
    { key: "start_date", header: "Start" },
    { key: "end_date", header: "End" },
    {
      key: "id",
      header: "",
      render(value, _) {
        return (
          <div className="flex items-center justify-end">
            <Button
              variant={"ghost"}
              onClick={() => {
                openModal({
                  title: "Edit Qualification",
                  content: (
                    <QualificationUpdateForm
                      qualificationId={value}
                      fetchQualifications={fetchQualifications}
                    />
                  ),
                });
              }}
            >
              <Edit />
            </Button>
            <Button
              variant={"ghost"}
              className="text-destructive"
              onClick={() => {
                openModal({
                  title: "Delete Confirmation",
                  content: (
                    <DeleteConfirmationModal
                      onClose={closeModal}
                      onConfirm={() => {
                        fetchQualifications();
                        closeModal();
                      }}
                      entityName="Qualification"
                      endpoint={`/employees/qualifications/details/${value}/`}
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
          <CardTitle>Qualifications</CardTitle>
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={() => {
              openModal({
                title: "Add qualification",
                description: "Fill the form below to add qualification",
                content: (
                  <QualificationAddForm
                    employeeId={employeeId}
                    fetchQualifications={fetchQualifications}
                  />
                ),
              });
            }}
          >
            <Plus />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-max-[320px]">
          <Table<Qualification> columns={columns} data={qualifications} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Qualifications;
