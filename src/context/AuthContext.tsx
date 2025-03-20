import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { POST } from "@/axios/axios";

// Define the  type for authentication context
interface AuthContextType {
  user: string | null;
  userDetail: UserDetailType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserDetailType {
  token_type: string;
  exp: number;
  iat: number;
  jti: number;
  user_id: number;
  email: string;
  employee_id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  organization: number;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("access");
  });
  const [userDetail, setUserDetail] = useState<UserDetailType | null>(() => {
    return user ? jwtDecode(user) : null;
  });

  const onLoginSuccess = (data: Record<string, any>) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setUser(data.access);
    window.location.href = "/";
  };

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      const decodedUser: UserDetailType = jwtDecode(access);
      setUserDetail(decodedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await POST(
      "auth/token/",
      {
        email,
        password,
      },
      onLoginSuccess
    );
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, userDetail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
