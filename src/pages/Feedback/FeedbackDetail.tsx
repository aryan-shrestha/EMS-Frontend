import { DELETE, GET } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";
import { Feedback } from "@/types/interfaces/Feedback";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import React from "react";

interface FeedbackDetailProps {
  feedbackId: number;
  callbackFn: () => void;
}

const FeedbackDetail: React.FC<FeedbackDetailProps> = ({
  feedbackId,
  callbackFn: fetchFeedbacks,
}) => {
  const { openModal } = useModal();
  const [feedback, setFeedback] = React.useState<Feedback | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchFeedbackDetails = React.useCallback(async () => {
    setIsLoading(true);
    await GET(
      `feedback-tracker/feedbacks/${feedbackId}/`,
      {},
      (data: Feedback) => {
        setFeedback(data);
      }
    );
    setIsLoading(false);
  }, [feedbackId]);

  React.useEffect(() => {
    fetchFeedbackDetails();
  }, []);

  return (
    <>
      <ScrollArea className="max-h-[480px] pt-4">
        {isLoading ? (
          <div
            className="flex justify-center items-center h-[200px] md:h-[250px] xl:h-[350px]"
            aria-label="Loading attendance data"
          >
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-semibold">
                Title
              </span>
              <span>{feedback?.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-semibold">
                Date
              </span>
              <span>{feedback?.date}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-semibold">
                Category
              </span>
              <span>{feedback?.category.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-semibold">
                Description
              </span>
              <span>{feedback?.description}</span>
            </div>
            {feedback?.status === "new" && (
              <div className="flex items-center justify-end pt-8">
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => {
                    openModal({
                      title: "Withdrawl confirmation",
                      description: "",
                      content: (
                        <WithdrawConfirmationModal
                          feedbackId={feedbackId}
                          callbackFn={fetchFeedbacks}
                        />
                      ),
                    });
                  }}
                >
                  Withdraw
                </Button>
              </div>
            )}
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default FeedbackDetail;

interface WithdrawConfirmationModalProps {
  feedbackId: number;
  callbackFn: () => void;
}

const WithdrawConfirmationModal: React.FC<WithdrawConfirmationModalProps> = ({
  feedbackId,
  callbackFn,
}) => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleWithdrawal = React.useCallback(async () => {
    setIsLoading(true);
    await DELETE(`feedback-tracker/feedbacks/${feedbackId}`, (_) => {
      showToast("Feedback withdrawn.", "success");
      callbackFn();
      closeModal();
    });
    setIsLoading(false);
  }, [feedbackId]);

  return (
    <>
      <p>
        Are you sure you want to <strong>withdraw</strong> the feedback?
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
          onClick={handleWithdrawal}
          className="cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Yes
        </Button>
      </div>
    </>
  );
};
