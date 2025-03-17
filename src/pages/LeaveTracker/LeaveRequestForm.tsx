import { POST } from "@/axios/instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AuthContext from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import React from "react";

interface LeaveRequestFormProps {
  onSuccess: () => void;
}

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({
  onSuccess: handleSuccess,
}) => {
  const auth = React.useContext(AuthContext);
  const { closeModal } = useModal();
  const [leaveType, setLeaveType] = React.useState<string>("");
  const [subject, setSubject] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await POST(
      "leave-tracker/leave-requests/",
      {
        employee: auth?.userDetail?.employee_id,
        type: leaveType,
        from_date: startDate,
        till_date: endDate,
        subject: subject,
        reason_for_leave: description,
      },
      (_) => {
        handleSuccess();
        setIsLoading(false);
        closeModal();
        showToast("Leave request sent", "success");
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col pt-4 gap-6 w-">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="leaveType">LeaveType</Label>
          <Select value={leaveType} onValueChange={setLeaveType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2">Sick leave</SelectItem>
                <SelectItem value="1">Casual leave</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            placeholder="E.g. Suffering from common cold"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fromDate">Leave Start Date</Label>
          <Input
            type="text"
            id="fromDate"
            placeholder="2081-01-12"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fromDate">Leave End Date</Label>
          <Input
            type="text"
            id="fromDate"
            placeholder="2081-01-16"
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description">Description</label>
          <Textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          >
            {description}
          </Textarea>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant={"destructive"}
            className="me-2 cursor-pointer"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            variant={"default"}
            className="cursor-pointer"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LeaveRequestForm;
