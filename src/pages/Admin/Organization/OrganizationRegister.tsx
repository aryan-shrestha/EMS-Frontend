import { GET, POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthContext from "@/context/AuthContext";
import { OrganizationType } from "@/types/interfaces/Organization";
import React from "react";
import { useNavigate } from "react-router";

const OrganizationForm: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [type, setType] = React.useState("");
  const [organizationTypes, setOrganizationTypes] = React.useState<
    OrganizationType[]
  >([]);

  const fetchOrganizationTypes = async () => {
    await GET(`organizations/types/`, {}, (data: OrganizationType[]) => {
      setOrganizationTypes(data);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await POST(
        `organizations/`,
        {
          name: organizationName,
          admin_users: [auth?.user?.id],
          first_name: firstName,
          last_name: lastName,
          type_of_organization: type,
        },
        (_) => {}
      );
    } catch (error) {
      console.log(error);
    } finally {
      auth?.getUser();
      navigate("/admin/organization/", {
        state: {
          message: "Organization registered successfully!",
          type: "success",
        },
      });
    }
  };

  React.useEffect(() => {
    fetchOrganizationTypes();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Card>
          <CardHeader className="mb-4">
            <CardTitle>Set up your organization</CardTitle>
          </CardHeader>
          <CardContent className="w-full grid grid-cols-2 gap-6">
            <div className="flex col-span-2 flex-col gap-1.5">
              <Label>Organization Name</Label>
              <Input
                type="text"
                id="organizationName"
                placeholder="E.g. Example Co."
                value={organizationName}
                onChange={(event) => {
                  setOrganizationName(event.target.value);
                }}
              />
            </div>
            <div className="flex col-span-2 flex-col gap-1.5">
              <Label>Organization Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={"Select organization type"}
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {organizationTypes.map((item) => {
                      return (
                        <SelectItem value={item.id.toString()} key={item.id}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Contact person's first name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="E.g. John"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Contact person's last name</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="E.g. Doe"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Register</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default OrganizationForm;
