import { UndoRounded } from "@mui/icons-material";
import { createContext, ReactNode, useState } from "react";

interface ContextType {
  isLogedIn: boolean | undefined;
  checkIsLogedIn: () => void;
}

export const AuthorizationContext = createContext<ContextType>({
  isLogedIn: localStorage.getItem("x-auth") !== null,
  checkIsLogedIn: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(
    localStorage.getItem("x-auth") !== null
  );

  function checkIsLogedIn() {
    console.log(localStorage.getItem("x-auth"));
    console.log(typeof localStorage.getItem("x-auth"));
    setIsLogedIn(localStorage.getItem("x-auth") !== null);
  }
  console.log(isLogedIn);

  const authorizationContext: ContextType = {
    isLogedIn,
    checkIsLogedIn,
  };

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
