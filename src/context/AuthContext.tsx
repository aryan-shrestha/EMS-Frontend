import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/axios/instance";

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
  first_name: string;
  last_name: string;
  profile_picture: string;
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
  const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      const decodedUser: UserDetailType = jwtDecode(access);
      setUserDetail(decodedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post("auth/token/", {
        email,
        password,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setUser(data.access);
      window.location.href = "/";
    } catch (error) {
      throw error;
    }
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
