import { DELETE } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import React from "react";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  entityName?: string;
  endpoint: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirm,
  entityName,
  endpoint,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const performDelete = async () => {
    setIsLoading(true);

    await DELETE(`${endpoint}`, (_) => {
      showToast(`${entityName} deleted successfully`, "success");
    });
    setIsLoading(false);
    onConfirm();
  };

  return (
    <>
      <p>
        Are you sure you want to <strong>delete</strong> the{" "}
        <strong>{entityName}</strong>?
      </p>
      <div className="mt-8 flex justify-end items-center gap-2">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={performDelete}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
