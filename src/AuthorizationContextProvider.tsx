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
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  
  function checkIsLogedIn() {
    if (localStorage.getItem("x-auth") === null) {
      setIsLogedIn(false);
      console.log(isLogedIn);
    } else {
      setIsLogedIn(true);
      console.log(isLogedIn);
    }
    console.log(isLogedIn);
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
