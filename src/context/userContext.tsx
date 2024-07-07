import { createContext, useEffect } from "react";
import { useApi } from "../hooks/use-api";
import { getCurrentUser } from "../api/auth";

type UserContextProps = {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  fetchUserData: any;
};
export const UserContext = createContext<UserContextProps>({
  isAuthenticated: false,
  loading: false,
  user: null,
  fetchUserData: () => {}
});

const UserProvider = ({ children }: any) => {
  const { response: user, loading, fetchData: fetchUserData } = useApi({ callbackFn: getCurrentUser });
  const isAuthenticated = user?.role === "authenticated";
  useEffect(() => {
    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ user, loading, isAuthenticated, fetchUserData }}>{children}</UserContext.Provider>;
};

export default UserProvider;
