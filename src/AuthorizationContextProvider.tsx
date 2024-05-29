import { createContext, ReactNode, useState } from "react";

interface ContextType {
  isLogedIn: boolean;
  setIsLogedIn: (array: boolean) => void;
  checkIsLogedIn: () => void;
}

export const AuthorizationContext = createContext<ContextType>({
  isLogedIn: true,
  setIsLogedIn: () => undefined,
  checkIsLogedIn: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(true);
  function checkIsLogedIn() {
    if (localStorage.getItem("x-auth") === null) {
      setIsLogedIn(false);
    } else {
      setIsLogedIn(true);
    }
  }

  const authorizationContext: ContextType = {
    isLogedIn,
    setIsLogedIn,
    checkIsLogedIn,
  };

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
