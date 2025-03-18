import { GET } from "@/axios/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notice } from "@/types/interfaces";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

interface NoticeDetailProps {
  noticeId: number;
}

const NoticeDetail: React.FC<NoticeDetailProps> = ({ noticeId }) => {
  const [noticeDetail, setNoticeDetail] = React.useState<Notice | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchNotice = React.useCallback(async () => {
    setIsLoading(true);
    await GET(`noticeboard/notices/${noticeId}`, {}, (data: Notice) => {
      setNoticeDetail(data);
      setIsLoading(false);
    });
  }, [noticeId]);

  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col pt-4 gap-6">
          <div className="flex flex-col">
            <span>
              <small>Subject</small>
            </span>
            <span>{noticeDetail?.title}</span>
          </div>
          <div className="flex flex-col">
            <span>
              <small>Date</small>
            </span>
            <span>{noticeDetail?.date}</span>
          </div>
          <div className="flex flex-col">
            <span>
              <small>Description</small>
            </span>
            <ScrollArea className="h-72">
              {noticeDetail?.description}
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeDetail;
