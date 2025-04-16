import axios from "axios";
import { toast } from "sonner";

const debug = import.meta.env.VITE_DUBUG == "true";

const baseURL = debug
  ? "http://127.0.0.1:8000/api/v2/"
  : "https://ems.nepadvisor.com/api/v2/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token refresh automatically on 401 response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orginalRequest = error.config;
    if (error.response?.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${baseURL}auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("access", data.access);
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`;
          return axiosInstance(orginalRequest);
        } catch (refreshError) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Generic error handler function

type APIErrorResponse = {
  errors: {
    [key: string]: string[] | string;
  };
};
export function handleAPIError(error: any): APIErrorResponse {
  if (error.response && error.response.data) {
    const errorData = error.response.data as APIErrorResponse;

    Object.entries(errorData.errors).forEach(([key, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((message) => {
          toast.error(`${key}: ${message}`);
        });
      } else {
        toast.error(messages);
      }
    });

    return errorData;
  }
  toast.error("An unexpected error occurred.");
  return { errors: { detail: ["An unexpected error occurred."] } };
}

export const GET = async <T>(
  url: string,
  params: Record<string, any> = {},
  callbackFn: (data: T) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    callbackFn(response.data);
  } catch (error) {
    handleAPIError(error);
  }
};

export const POST = async (
  url: string,
  payload: Record<string, any>,
  callbackFn: (data: any) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.post(url, payload);
    callbackFn(response.data);
  } catch (error) {
    handleAPIError(error);
  }
};

export const PUT = async <T>(
  url: string,
  payload: Record<string, any>,
  callbackFn: (data: T) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.put<T>(url, payload);
    callbackFn(response.data);
  } catch (error) {
    handleAPIError(error);
  }
};

// PATCH Request
export const PATCH = async <T>(
  url: string,
  payload: Record<string, any>,
  callbackFn: (data: T) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.patch<T>(url, payload);
    callbackFn(response.data);
  } catch (error) {
    handleAPIError(error);
  }
};

// DELETE Request
export const DELETE = async <T>(
  url: string,
  callbackFn: (data: T) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.delete<T>(url);
    callbackFn(response.data);
  } catch (error) {
    handleAPIError(error);
  }
};
