import { POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/context/ModalContext";
import { Qualification } from "@/types/interfaces/Employee";
import { Loader2, Plus } from "lucide-react";
import React from "react";

interface QualificationAddFormProps {
  employeeId: number | string | undefined;
  fetchQualifications: () => void;
}

const QualificationAddForm: React.FC<QualificationAddFormProps> = ({
  employeeId,
  fetchQualifications,
}) => {
  const [qualification, setQualification] = React.useState<Qualification>({
    start_date: "",
    end_date: "",
    college: "",
    degree: "",
    field_of_study: "",
  });
  const { closeModal } = useModal();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange =
    (key: keyof typeof qualification) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setQualification((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await POST(
        `employees/qualifications/${employeeId}/`,
        qualification,
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label htmlFor="degree" className="text-muted-foreground mb-0.5">
            Degree
          </Label>
          <Input
            type="text"
            id="degree"
            value={qualification.degree}
            onChange={handleChange("degree")}
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
            value={qualification.field_of_study}
            onChange={handleChange("field_of_study")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="college" className="text-muted-foreground mb-0.5">
            University/College
          </Label>
          <Input
            type="text"
            id="college"
            value={qualification.college}
            onChange={handleChange("college")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="startDate" className="text-muted-foreground mb-0.5">
            From date
          </Label>
          <Input
            type="text"
            id="startDate"
            value={qualification.start_date}
            onChange={handleChange("start_date")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="endDate" className="text-muted-foreground mb-0.5">
            To date
          </Label>
          <Input
            type="text"
            id="endDate"
            value={qualification.end_date}
            onChange={handleChange("end_date")}
          />
        </div>
        <div className="flex justify-end">
          <Button variant={"default"} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
            Add{" "}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QualificationAddForm;
