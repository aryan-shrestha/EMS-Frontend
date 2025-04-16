import { POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";
import { WorkExperience } from "@/types/interfaces/Employee";
import { Loader2, Plus } from "lucide-react";
import React from "react";

interface WorkExperienceFormProps {
  employeeId: string | number | undefined;
  fetchWorkExperience: () => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  employeeId,
  fetchWorkExperience,
}) => {
  const { closeModal } = useModal();

  const [workExperience, setWorkExperience] = React.useState<WorkExperience>({
    id: null,
    organization: null,
    from_date: "",
    to_date: "",
    company_name: "",
    job_title: "",
    job_description: "",
    relevant: "",
    employee: employeeId,
  });

  const handleChange =
    (key: keyof typeof workExperience) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setWorkExperience((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await POST(
        `employees/work-experiences/${employeeId}/`,
        workExperience,
        () => {
          fetchWorkExperience();
          showToast("New work experience added", "success");
          closeModal();
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label htmlFor="jobTitle" className="text-muted-foreground mb-0.5">
            Job Title
          </Label>
          <Input
            type="text"
            id="jobTitle"
            value={workExperience.job_title}
            onChange={handleChange("job_title")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="companyName" className="text-muted-foreground mb-0.5">
            Company name
          </Label>
          <Input
            type="text"
            id="companyName"
            value={workExperience.company_name}
            onChange={handleChange("company_name")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="fromDate" className="text-muted-foreground mb-0.5">
            From date
          </Label>
          <Input
            type="text"
            id="fromDate"
            value={workExperience.from_date}
            onChange={handleChange("from_date")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="toDate" className="text-muted-foreground mb-0.5">
            To date
          </Label>
          <Input
            type="text"
            id="toDate"
            value={workExperience.to_date}
            onChange={handleChange("to_date")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="relevant" className="text-muted-foreground mb-0.5">
            Relevant
          </Label>
          <Input
            type="text"
            id="relevant"
            value={workExperience.relevant}
            onChange={handleChange("relevant")}
          />
        </div>
        <div className="flex flex-col">
          <Label
            htmlFor="jobDescription"
            className="text-muted-foreground mb-0.5"
          >
            Job Description
          </Label>
          <Textarea
            id="jobDescription"
            value={workExperience.job_description}
            onChange={handleChange("job_description")}
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

export default WorkExperienceForm;
