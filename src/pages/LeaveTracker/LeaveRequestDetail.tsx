import { DELETE, GET } from "@/axios/instance";
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
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";

import { LeaveRequest } from "@/types/interfaces/LeaveTrackerTypes";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface LeaveRequestDetailProps {
  leaveRequestId: number;
  onCancel: () => void;
}

const LeaveRequestDetail: React.FC<LeaveRequestDetailProps> = ({
  leaveRequestId,
  onCancel: refreshData,
}) => {
  const { closeModal, openModal } = useModal();
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    await GET(
      `/leave-tracker/leave-requests/${leaveRequestId}/`,
      {},
      (data: LeaveRequest) => {
        setLeaveRequest(data);
        setIsLoading(false);
      }
    );
  };

  const handleCancel = async () => {
    await DELETE(`/leave-tracker/leave-requests/${leaveRequestId}`, (_) => {
      showToast("Leave request cancelled.", "success");
      refreshData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col pt-4 gap-6 w-">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">LeaveType</Label>
            <Select value={leaveRequest?.type.toString()} disabled>
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
              value={leaveRequest?.subject}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fromDate">Leave Start Date</Label>
            <Input
              type="text"
              id="fromDate"
              placeholder="2081-01-12"
              value={leaveRequest?.from_date}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fromDate">Leave End Date</Label>
            <Input
              type="text"
              id="tillDate"
              placeholder="2081-01-16"
              value={leaveRequest?.till_date}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">Status</Label>
            <Select
              value={leaveRequest?.is_reviewed ? "reviewed" : "pending"}
              disabled
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">Is approved</Label>
            <Select
              value={leaveRequest?.is_approved ? "approved" : "-"}
              disabled
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="-">Declined</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">Is paid</Label>
            <Select
              value={leaveRequest?.is_approved ? "paid" : "unpaid"}
              disabled
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description">Description</label>
            <Textarea value={leaveRequest?.reason_for_leave} disabled>
              {leaveRequest?.reason_for_leave}
            </Textarea>
          </div>
          {!leaveRequest?.is_reviewed && (
            <div className="flex items-center justify-end">
              <Button
                variant={"destructive"}
                className="me-2 cursor-pointer"
                onClick={() => {
                  openModal({
                    title: "Cancel confirmation",
                    description: "",
                    content: (
                      <CancelConfirmationModal
                        closeModal={closeModal}
                        callbackFn={handleCancel}
                      />
                    ),
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LeaveRequestDetail;

interface CancelConfirmationModalProps {
  closeModal: () => void;
  callbackFn: () => void;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  closeModal,
  callbackFn,
}) => {
  return (
    <>
      <p>
        Are you sure you want to <strong>cancel</strong> the leave request?
      </p>
      <div className="mt-2 flex justify-end items-center gap-2">
        <Button
          onClick={() => {
            closeModal();
          }}
          className="cursor-pointer"
        >
          No
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            callbackFn();
            closeModal();
          }}
          className="cursor-pointer"
        >
          Yes
        </Button>
      </div>
    </>
  );
};
