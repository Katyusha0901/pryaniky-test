import { createContext, ReactNode, useState } from "react";
import { TableEntry } from "../Types";

interface ContextType {
  isLoggedIn: boolean;
  checkisLoggedIn: () => void;
}

export const AuthorizationContext = createContext<ContextType>({
  isLoggedIn: localStorage.getItem("x-auth") !== null,
  checkisLoggedIn: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(
    localStorage.getItem("x-auth") !== null
  );
  const authorizationContext: ContextType = {
    isLoggedIn,
    checkisLoggedIn,
  };

  function checkisLoggedIn() {
    setisLoggedIn(localStorage.getItem("x-auth") !== null);
  }

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
