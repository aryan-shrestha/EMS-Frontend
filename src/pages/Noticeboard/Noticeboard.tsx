import { GET } from "@/axios/axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/context/ModalContext";
import Table, { Column } from "@/custom-components/Table/Table";
import { Notice } from "@/types/interfaces";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import NoticeDetail from "./NoticeDetail";

const Noticeboard: React.FC = () => {
  const { openModal } = useModal();

  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchNotices = async () => {
    setIsLoading(true);
    await GET(`noticeboard/notices/`, {}, (data: Notice[]) => {
      setNotices(data);
      setIsLoading(false);
    });
  };

  const columns: Column<Notice>[] = [
    { key: "date", header: "Date" },
    {
      key: "title",
      header: "Title",
      render(value, row) {
        return (
          <span
            role="button"
            aria-roledescription="button"
            className="cursor-pointer"
            onClick={() => {
              openModal({
                title: "Notice description",
                description: "",
                content: <NoticeDetail noticeId={row.id} />,
              });
            }}
          >
            {value}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Notices</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Table<Notice> columns={columns} data={notices} />
          )}
        </CardContent>
        <CardFooter>
          <small>{notices.length} notices found</small>
        </CardFooter>
      </Card>
    </>
  );
};

export default Noticeboard;
