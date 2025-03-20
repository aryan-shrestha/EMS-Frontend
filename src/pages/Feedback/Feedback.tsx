import { GET } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AuthContext from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import Table, { Column } from "@/custom-components/Table/Table";
import { Feedback } from "@/types/interfaces/Feedback";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import FeedbackDetail from "./FeedbackDetail";
import FeedbackForm from "./FeedbackForm";

const FeedbackPage: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { openModal } = useModal();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    await GET(`/feedback-tracker/feedbacks/`, {}, (data: Feedback[]) => {
      setFeedbacks(data);
    });
    setIsLoading(false);
  };

  const columns: Column<Feedback>[] = [
    { key: "date", header: "Date" },
    {
      key: "title",
      header: "Title",
      render(_, row) {
        return (
          <span
            className="font-semibold underline underline-offset-4 cursor-pointer"
            onClick={() => {
              openModal({
                title: "Feedback details",
                description: "",
                content: (
                  <FeedbackDetail
                    feedbackId={row.id}
                    callbackFn={fetchFeedbacks}
                  />
                ),
              });
            }}
          >
            {row.title}
          </span>
        );
      },
    },
    { key: "status", header: "Status" },
    {
      key: "is_anonymous",
      header: "Visibility",
      render(value, _) {
        return value ? <EyeOff size={18} /> : <Eye size={18} />;
      },
    },
  ];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card className="shadow-none md:col-span-2 xl:col-span-4">
        <CardContent>
          <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
              Good morning {auth?.userDetail?.first_name} !
            </h1>
            <Button
              className="cursor-pointer"
              onClick={() => {
                openModal({
                  title: "Post a feedback",
                  description: "",
                  content: <FeedbackForm onSuccess={fetchFeedbacks} />,
                });
              }}
            >
              Post a Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-none md:col-span-2 xl:col-span-4">
        <CardContent>
          <ScrollArea className="flex justify-center items-center h-[200px] md:h-[250px] xl:h-[450px]">
            {isLoading ? (
              <div
                className="flex justify-center items-center h-[200px] md:h-[250px] xl:h-[350px]"
                aria-label="Loading attendance data"
              >
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Table<Feedback> columns={columns} data={feedbacks} />
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackPage;
