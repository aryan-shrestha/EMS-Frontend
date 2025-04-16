import { POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/context/ModalContext";
import { showToast } from "@/lib/toast";
import { Loader2, PlusCircle } from "lucide-react";
import React from "react";

interface EmployeeAddFormProps {
  onsubmit: () => void;
}

const EmployeeAddForm: React.FC<EmployeeAddFormProps> = ({
  onsubmit: fetchEmployees,
}) => {
  const { closeModal } = useModal();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const sendInvitation = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    let payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    await POST(`employees/`, payload, (_) => {
      showToast("Invitation has been sent to the user", "success");
      setFirstName("");
      setLastName("");
      setEmail("");
    });
    fetchEmployees();
    setIsLoading(false);
    closeModal();
  };

  return (
    <form onSubmit={sendInvitation}>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
          <Label>First name</Label>
          <Input
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
          <Label>Last name</Label>
          <Input
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Label>Email</Label>
          <Input
            type="email "
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="flex justify-end col-span-2">
          <Button disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
            Invite
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeAddForm;
