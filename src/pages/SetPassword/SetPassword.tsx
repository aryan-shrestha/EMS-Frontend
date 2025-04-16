import { POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Toaster } from "sonner";

const SetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let payload = {
      email: location.state?.email,
      password: password,
    };
    await POST(`auth/set-password/`, payload, (_) => {
      setIsLoading(false);
      navigate("/login", {
        state: {
          message: "Password set successfully. You can now log in.",
          type: "success",
        },
      });
    });
  };

  React.useEffect(() => {
    if (location.state?.message) {
      console.log("message: ", location.state.message);

      showToast(location.state.message, location.state.type);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Toaster position="top-center" expand={true} />
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl capitalize">
                Create password
              </CardTitle>
              <CardDescription>
                Create a new password for your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Enter a new password</Label>
                    <Input
                      id="password"
                      type="email"
                      placeholder="m@example.com"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />} Create
                    password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
