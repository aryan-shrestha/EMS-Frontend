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
import { Loader2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { Toaster } from "sonner";

const AccountActivation: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    let payload = {
      email,
      otp,
    };

    await POST(`auth/verify-otp/`, payload, (_) => {
      navigate("/set-password", {
        state: {
          email: email,
          message: "Account activated. Please set your password",
          type: "success",
        },
      });
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Toaster position="top-center" />
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl capitalize">
                Activate your account
              </CardTitle>
              <CardDescription>Enter your email and OTP below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="otp">OTP</Label>
                    </div>
                    <Input
                      id="otp"
                      type="password"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />} Activate
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

export default AccountActivation;
