// components/RouteModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface RouteModalProps {
  routePath: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const RouteModal: React.FC<RouteModalProps> = ({
  routePath,
  title,
  description,
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(location.pathname === routePath);
  }, [location.pathname, routePath]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RouteModal;
