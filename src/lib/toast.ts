import { toast } from "sonner";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning"
) => {
  toast[type](message);
};
