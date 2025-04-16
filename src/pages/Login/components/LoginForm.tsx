import { useState, useContext, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AuthContext from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { showToast } from "@/lib/toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      setIsloading(true);
      try {
        await auth.login(email, password);
      } catch (error) {
        setPassword("");
      } finally {
        setIsloading(false);
      }
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      showToast(location.state.message, location.state.type);
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="top-center" expand={true} />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl capitalize">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} Login
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                Sign In With Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
