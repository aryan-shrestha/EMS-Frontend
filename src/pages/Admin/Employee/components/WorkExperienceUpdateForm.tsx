import { GET, PATCH } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";
import { WorkExperience } from "@/types/interfaces/Employee";
import { Loader2 } from "lucide-react";
import React from "react";

interface WorkExperienceFormProps {
  workExperienceId: string | number | null | undefined;
  fetchWorkExperience: () => void;
}

const WorkExperienceUpdateForm: React.FC<WorkExperienceFormProps> = ({
  workExperienceId,
  fetchWorkExperience,
}) => {
  const { closeModal } = useModal();

  const [workExperience, setWorkExperience] = React.useState<
    WorkExperience | undefined
  >(undefined);

  const getWorkExperience = async () => {
    await GET(
      `employees/work-experiences/details/${workExperienceId}`,
      {},
      (data: WorkExperience) => {
        setWorkExperience(data);
      }
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await PATCH(
        `employees/work-experiences/details/${workExperienceId}/`,
        {
          from_date: workExperience?.from_date,
          to_date: workExperience?.to_date,
          job_title: workExperience?.job_title,
          job_description: workExperience?.job_description,
          relevant: workExperience?.relevant,
        },
        () => {
          showToast("Work experience updated", "success");
          fetchWorkExperience();
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
    workExperienceId && getWorkExperience();
  }, [workExperienceId]);

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
            value={workExperience?.job_title}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, job_title: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="companyName" className="text-muted-foreground mb-0.5">
            Company name
          </Label>
          <Input
            type="text"
            id="companyName"
            value={workExperience?.company_name}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, company_name: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="fromDate" className="text-muted-foreground mb-0.5">
            From date
          </Label>
          <Input
            type="text"
            id="fromDate"
            value={workExperience?.from_date}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, from_date: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="toDate" className="text-muted-foreground mb-0.5">
            To date
          </Label>
          <Input
            type="text"
            id="toDate"
            value={workExperience?.to_date}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, to_date: event.target.value } : prev
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="relevant" className="text-muted-foreground mb-0.5">
            Relevant
          </Label>
          <Input
            type="text"
            id="relevant"
            value={workExperience?.relevant}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, relevant: event.target.value } : prev
              );
            }}
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
            value={workExperience?.job_description}
            onChange={(event) => {
              setWorkExperience((prev) =>
                prev ? { ...prev, job_description: event.target.value } : prev
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

export default WorkExperienceUpdateForm;
