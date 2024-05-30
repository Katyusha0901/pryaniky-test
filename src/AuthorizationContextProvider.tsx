import { UndoRounded } from "@mui/icons-material";
import { createContext, ReactNode, useState } from "react";

interface ContextType {
  isLogedIn: boolean;
  isRegistration: boolean;
  checkIsLogedIn: () => void;
  checkIsRegistration: () => void;
}

export const AuthorizationContext = createContext<ContextType>({
  isLogedIn: localStorage.getItem("x-auth") !== null,
  isRegistration: true,
  checkIsLogedIn: () => undefined,
  checkIsRegistration: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(
    localStorage.getItem("x-auth") !== null
  );

  const [isRegistration, setIsRegistration] = useState<boolean>(
    localStorage.getItem("isRegistration") !== null
  );

  function checkIsLogedIn() {
    setIsLogedIn(localStorage.getItem("x-auth") !== null);
  }

  function checkIsRegistration() {
    setIsRegistration(localStorage.getItem("isRegistration") !== null);
  }

  const authorizationContext: ContextType = {
    isLogedIn,
    isRegistration,
    checkIsLogedIn,
    checkIsRegistration,
  };

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
