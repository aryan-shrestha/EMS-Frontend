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
import { TooltipProvider } from "@/components/ui/tooltip";

import { useState } from "react";

const LeaveRequestForm: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <TooltipProvider>
      <form>
        <div className="flex flex-col pt-4 gap-6 w-">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">LeaveType</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Sick leave</SelectItem>
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
          <div>
            <Button>Apply for leave</Button>
          </div>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default LeaveRequestForm;
