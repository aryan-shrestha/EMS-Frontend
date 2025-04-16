import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import NotificationContext from "@/context/NotificationContext";
import { Attendance } from "@/types/interfaces";
import useGeolocation from "@/hooks/useGeolocation";
import { toast } from "sonner";
import axios, { POST } from "@/axios/axios";
import NepaliDate from "nepali-date-converter";
import { isAxiosError } from "axios";

const hasCheckedIn = (attendance: Attendance | undefined): boolean =>
  !!attendance?.check_ins_outs.some((item) => item.check_out === null);

const CheckInBtn: React.FC = () => {
  const notificationContext = useContext(NotificationContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { latitude, longitude, error: locationError } = useGeolocation();
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `attendances/?date=${NepaliDate.now().format("YYYY-MM-DD")}`
      );
      setIsCheckedIn(hasCheckedIn(response.data));
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          `Error ${error.response?.status}: ${error.response?.data.error}`
        );
      } else {
        toast.error("Something went wrong.");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = async () => {
    let endpoint = isCheckedIn
      ? "/attendances/check-out/"
      : "/attendances/check-in/";

    setIsLoading(true);
    await POST(
      endpoint,
      {
        latitude,
        longitude,
      },
      (data) => {
        notificationContext?.fetchNotifications();
        setIsCheckedIn(hasCheckedIn(data));
        let message = hasCheckedIn(data)
          ? "Checked in successfully"
          : "Checked out successfully";
        toast.success(message);
        setIsLoading(false);
      }
    );
    setIsLoading(false);
  };

  useEffect(() => {
    locationError && toast.error(locationError);
  }, [locationError]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <Button
      disabled={isLoading}
      onClick={() => handleOnClick()}
      className={cn(
        "cursor-pointer",
        "text-sm px-4 py-2",
        "sm:text-base sm:px-6 sm:py-3",
        "md:text-md md:px-8 md:py-4"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : isCheckedIn ? (
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
