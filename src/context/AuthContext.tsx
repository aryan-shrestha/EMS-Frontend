import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { GET, POST } from "@/axios/axios";
import { User } from "@/types/interfaces/Auth";
import { Loader2 } from "lucide-react";

// Define the  type for authentication context
interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  getUser: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access")
  );
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() =>
    accessToken ? jwtDecode(accessToken) : null
  );

  // Fetch user info
  const getUser = useCallback(async () => {
    setIsUserLoading(true);
    try {
      await GET(`auth/accounts/me/`, {}, (data: User) => {
        setUser(data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  // Handle login
  const login = async (email: string, password: string) => {
    await POST("auth/token/", { email, password }, async (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setAccessToken(data.access);
      await getUser();
      window.location.href = "/";
    });
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  // Fetch user on mount
  useEffect(() => {
    if (accessToken) {
      getUser();
    } else {
      setIsUserLoading(false);
    }
  }, [accessToken, getUser]);

  const isLoading = isUserLoading;
  return isLoading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader2 className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  ) : (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoading,
        getUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
