import { UndoRounded } from "@mui/icons-material";
import { createContext, ReactNode, useEffect, useState } from "react";
import { TableEntry } from "./Types";

interface ContextType {
  isLogedIn: boolean;
  isRegistration: boolean;
  checkIsLogedIn: () => void;
  checkIsRegistration: () => void;
  dataEntry: TableEntry[];
  setDataEntry: React.Dispatch<React.SetStateAction<TableEntry[]>>;
}

export const AuthorizationContext = createContext<ContextType>({
  isLogedIn: localStorage.getItem("x-auth") !== null,
  isRegistration: true,
  checkIsLogedIn: () => undefined,
  checkIsRegistration: () => undefined,
  dataEntry: [],
  setDataEntry: () => undefined,
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

  const [dataEntry, setDataEntry] = useState<TableEntry[]>([]);

  const authorizationContext: ContextType = {
    isLogedIn,
    isRegistration,
    checkIsLogedIn,
    checkIsRegistration,
    dataEntry,
    setDataEntry,
  };

  function zapros() {
    fetch(
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth": `${localStorage.getItem("x-auth")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDataEntry(data.data);
      });
  }

  useEffect(() => {
    zapros();
  }, [isLogedIn]);

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
