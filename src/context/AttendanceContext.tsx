import { createContext, useState, useEffect, ReactNode, useRef } from "react";
import axios from "@/axios/instance";

import NepaliDate from "nepali-date-converter";
import { toast } from "sonner";
import { Attendance } from "@/types/interfaces";

interface AttendanceContextType {
  attendance: Attendance | null;
  isAttendanceLoading: boolean;
  handleCheckInOut: (attendance: Attendance) => Promise<void>;
}

interface AttendanceProviderProps {
  children: ReactNode;
}

const currentNepaliDate = new NepaliDate(new Date()).format(`YYYY-MM-DD`);

const handleGeolocationError = (error: GeolocationPositionError): void => {
  switch (error.code) {
    case 1:
      toast.error(
        "Location access denied. Please allow location access and try again."
      );
      break;
    case 2:
      toast.error(
        "Location unavailable. Please check your GPS or internet connection."
      );
      break;
    case 3:
      toast.error("Location request timed out. Try again.");
      break;
    default:
      toast.error("An unknown error occurred while fetching location.");
  }
};

const AttendanceContext = createContext<AttendanceContextType | null>(null);

export const AttendanceProvider = ({ children }: AttendanceProviderProps) => {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);
  const toastShown = useRef(false); // Prevents duplicate toast

  const fetchAttendance = async () => {
    setIsAttendanceLoading(true);
    try {
      const response = await axios.get(`attendance/?date=${currentNepaliDate}`);
      setAttendance(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsAttendanceLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckInOut = async (attendance: Attendance): Promise<void> => {
    setIsAttendanceLoading(true);
    toastShown.current = false; // Reset before making a request

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        if (toastShown.current) return; // Prevent duplicate toast
        toastShown.current = true;

        const { latitude, longitude } = position.coords;
        let endpoint = attendance.has_checked_in
          ? "/attendance/check-out/"
          : "/attendance/check-in/";
        try {
          const response = await axios.post<Attendance>(endpoint, {
            latitude,
            longitude,
          });
          setAttendance(response.data);
          let message = response.data.has_checked_in
            ? `Checked in successfully`
            : `Checked out successfully`;
          toast.success(message);
        } catch (error: any) {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          let message = attendance.has_checked_in
            ? "Failed to check out. Please try again later."
            : "Failed to check in. Please try again later.";
          toast.error(message);
        } finally {
          setIsAttendanceLoading(false);
        }
      },
      (error: GeolocationPositionError) => {
        handleGeolocationError(error);
        setIsAttendanceLoading(false);
      },
      {
        enableHighAccuracy: true, // Tries to get the most accurate location
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0, // No cached location
      }
    );
  };

  return (
    <AttendanceContext.Provider
      value={{ attendance, isAttendanceLoading, handleCheckInOut }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContext;
