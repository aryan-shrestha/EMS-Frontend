import { cn } from "@/lib/utils";
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
import React from "react";
import { POST } from "@/axios/axios";
import { Toaster } from "sonner";
import { Link, useNavigate } from "react-router";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await POST(
      `auth/accounts/`,
      {
        email,
        password,
      },
      (_) => {
        navigate("/login", {
          state: { message: "Signed up successfully!", type: "success" },
        });
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="top-center" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Your work, simplified. Your team, connected.
          </CardDescription>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Sign up
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                Sign In With Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
