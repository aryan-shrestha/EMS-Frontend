import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface InvisibleInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: boolean;
}

const InvisibleInput: React.FC<InvisibleInputProps> = ({
  label,
  value,
  onChange,
  isEditable,
}) => {
  return (
    <>
      <Label className="text-muted-foreground">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event);
        }}
        disabled={!isEditable}
        className={`${
          isEditable ? "" : "pl-0 disabled:opacity-100 border-0"
        } font-medium`}
      />
    </>
  );
};

export default InvisibleInput;
