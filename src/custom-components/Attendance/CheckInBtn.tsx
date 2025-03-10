import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import AttendanceContext from "@/context/AttendanceContext";
import NotificationContext from "@/context/NotificationContext";
import { Attendance } from "@/types/interfaces";

interface CheckInBtnProps {
  isAttendanceLoading: boolean | null | undefined;
  attendance?: Attendance | null;
}

const CheckInBtn: React.FC<CheckInBtnProps> = ({
  isAttendanceLoading,
  attendance,
}) => {
  const attendanceContext = useContext(AttendanceContext);
  const notificationContext = useContext(NotificationContext);

  const handleOnClick = async () => {
    if (attendanceContext?.attendance) {
      await attendanceContext.handleCheckInOut(attendanceContext.attendance);
      console.log("check in out success full");

      await notificationContext?.fetchNotifications();
    } else return;
  };

  return (
    <Button
      disabled={isAttendanceLoading ? isAttendanceLoading : false}
      onClick={() => handleOnClick()}
      className={cn(
        "cursor-pointer",
        "text-sm px-4 py-2",
        "sm:text-base sm:px-6 sm:py-3",
        "md:text-md md:px-8 md:py-4"
      )}
    >
      {isAttendanceLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : attendance?.has_checked_in ? (
        <>
          <LogOut />
          Check out
        </>
      ) : (
        <>
          <LogIn />
          Check In
        </>
      )}
    </Button>
  );
};

export default CheckInBtn;
