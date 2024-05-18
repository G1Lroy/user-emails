import { ReactNode, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (flag: boolean) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => !!sessionStorage.getItem("user"));

  const logOut = () => {
    setIsAuth(false);
    sessionStorage.clear();
    toast.info("Log out");
  };

  return <AuthContext.Provider value={{ isAuth, setIsAuth, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
