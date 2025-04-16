import { GET, PATCH } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvisibleInput from "@/custom-components/InvisibleInput/InvisibleInput";
import { showToast } from "@/lib/toast";
import { PersonalInformation } from "@/types/interfaces/Employee";

import { Check, Edit, Loader2, X } from "lucide-react";
import React from "react";

interface PersonalInformationProps {
  personalInformationId: string | number | undefined;
}

const PersonalInformationForm: React.FC<PersonalInformationProps> = ({
  personalInformationId,
}) => {
  const [personalInformation, setPersonalInformation] = React.useState<
    PersonalInformation | undefined
  >(undefined);
  const [isEditable, setIsEditable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getPersonalInformation = React.useCallback(async () => {
    if (!personalInformationId) return;
    await GET(
      `employees/personal-informations/${personalInformationId}/`,
      {},
      (data: PersonalInformation) => {
        setPersonalInformation(data);
      }
    );
  }, [personalInformationId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      id: personalInformation?.id,
      date_of_birth: personalInformation?.date_of_birth,
      expertise: personalInformation?.expertise,
      gender: personalInformation?.gender,
      marital_status: personalInformation?.marital_status,
    };
    try {
      setIsEditable(false);
      await PATCH(
        `employees/personal-informations/${personalInformationId}/`,
        payload,
        (data: PersonalInformation) => {
          setPersonalInformation(data);
          setIsEditable(false);
          showToast("Personal information updated", "success");
        }
      );
    } catch (error) {
      setIsEditable(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getPersonalInformation();
  }, [personalInformationId]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Personal information</CardTitle>
          {isEditable ? (
            <div className="space-x-2">
              <Button
                variant={"default"}
                onClick={() => {
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Check />}
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              >
                <X />
              </Button>
            </div>
          ) : (
            <Button
              variant={"secondary"}
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Edit />}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="Date of Birth (B.S.)"
              value={personalInformation?.date_of_birth ?? "-"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPersonalInformation((prev) =>
                  prev ? { ...prev, date_of_birth: event.target.value } : prev
                );
              }}
              isEditable={isEditable}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <InvisibleInput
              label="Expertise"
              value={personalInformation?.expertise ?? "-"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPersonalInformation((prev) =>
                  prev ? { ...prev, expertise: event.target.value } : prev
                );
              }}
              isEditable={isEditable}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <Label className="text-muted-foreground">Gender</Label>
            <Select
              disabled={!isEditable}
              value={personalInformation?.gender ?? ""}
              onValueChange={(value: string) => {
                setPersonalInformation((prev) =>
                  prev ? { ...prev, gender: value } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <Label className="text-muted-foreground">Marital status</Label>
            <Select
              disabled={!isEditable}
              value={personalInformation?.marital_status.toString()}
              onValueChange={(value: string) => {
                setPersonalInformation((prev) =>
                  prev ? { ...prev, marital_status: JSON.parse(value) } : prev
                );
              }}
            >
              <SelectTrigger
                className={`w-full font-medium disabled:opacity-100 ${
                  !isEditable && "border-0 pl-0"
                }`}
              >
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Married</SelectItem>
                  <SelectItem value="false">Unmarried</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationForm;
