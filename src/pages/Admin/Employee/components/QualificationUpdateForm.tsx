import { GET, PATCH } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/context/ModalContext";
import { Qualification } from "@/types/interfaces/Employee";
import { Loader2 } from "lucide-react";
import React from "react";

interface QualificationUpdateFormProps {
  qualificationId: string | number | undefined;
  fetchQualifications: () => {};
}

const QualificationUpdateForm: React.FC<QualificationUpdateFormProps> = ({
  qualificationId,
  fetchQualifications,
}) => {
  const { closeModal } = useModal();
  const [qualification, setQualification] = React.useState<
    Qualification | undefined
  >(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  const getQualification = async () => {
    await GET(
      `employees/qualifications/details/${qualificationId}`,
      {},
      (data: Qualification) => {
        setQualification(data);
      }
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await PATCH(
        `employees/qualifications/details/${qualificationId}/`,
        {
          degree: qualification?.degree,
          field_of_study: qualification?.field_of_study,
          college: qualification?.college,
          start_date: qualification?.start_date,
          end_date: qualification?.end_date,
        },
        () => {
          fetchQualifications();
          closeModal();
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    qualificationId && getQualification();
  }, [qualificationId]);

  return (
    <form
      onSubmit={handleSubmit}
      aria-description="Employee qualification form modal"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label htmlFor="degree" className="text-muted-foreground mb-0.5">
            Degree
          </Label>
          <Input
            type="text"
            id="degree"
            value={qualification?.degree}
            onChange={(event) => {
              setQualification((prev) =>
                prev ? { ...prev, degree: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label
            htmlFor="fieldOfStudy"
            className="text-muted-foreground mb-0.5"
          >
            Field of study
          </Label>
          <Input
            type="text"
            id="fieldOfStudy"
            value={qualification?.field_of_study}
            onChange={(event) => {
              setQualification((prev) =>
                prev ? { ...prev, field_of_study: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="college" className="text-muted-foreground mb-0.5">
            University/College
          </Label>
          <Input
            type="text"
            id="college"
            value={qualification?.college}
            onChange={(event) => {
              setQualification((prev) =>
                prev ? { ...prev, college: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="startDate" className="text-muted-foreground mb-0.5">
            From date
          </Label>
          <Input
            type="text"
            id="startDate"
            value={qualification?.start_date}
            onChange={(event) => {
              setQualification((prev) =>
                prev ? { ...prev, start_date: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="endDate" className="text-muted-foreground mb-0.5">
            To date
          </Label>
          <Input
            type="text"
            id="endDate"
            value={qualification?.end_date}
            onChange={(event) => {
              setQualification((prev) =>
                prev ? { ...prev, end_date: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button variant={"default"} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Update{" "}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QualificationUpdateForm;
