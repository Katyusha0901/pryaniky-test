import { createContext, ReactNode, useEffect, useState } from "react";
import { TableEntry } from "./Types";

interface ContextType {
  isLogedIn: boolean;
  isRegistration: boolean;
  checkIsLogedIn: () => void;
  checkIsRegistration: () => void;
  dataEntry: TableEntry[];
  setDataEntry: React.Dispatch<React.SetStateAction<TableEntry[]>>;
  deleteRow: (entryId: string) => void;
  changeRow: (
    rowId: string,
    data: { error_code: number; error_message: string; data: TableEntry }
  ) => TableEntry[];
}

export const AuthorizationContext = createContext<ContextType>({
  isLogedIn: localStorage.getItem("x-auth") !== null,
  isRegistration: true,
  checkIsLogedIn: () => undefined,
  checkIsRegistration: () => undefined,
  dataEntry: [],
  setDataEntry: () => undefined,
  deleteRow: () => undefined,
  changeRow: (rowId, data) => [],
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

  const [dataEntry, setDataEntry] = useState<TableEntry[]>([]);

  const authorizationContext: ContextType = {
    isLogedIn,
    isRegistration,
    checkIsLogedIn,
    checkIsRegistration,
    dataEntry,
    setDataEntry,
    deleteRow,
    changeRow,
  };

  useEffect(() => {
    takeData();
  }, [isLogedIn]);

  function checkIsLogedIn() {
    setIsLogedIn(localStorage.getItem("x-auth") !== null);
  }

  function checkIsRegistration() {
    setIsRegistration(localStorage.getItem("isRegistration") !== null);
  }

  function takeData() {
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

  function deleteRow(entryId: string) {
    setDataEntry(dataEntry.filter((entry) => entry.id !== entryId));
  }

  function changeRow(
    rowId: string,
    data: { error_code: number; error_message: string; data: TableEntry }
  ) {
    const newDataEntry: TableEntry[] = dataEntry.map((entry) => {
      if (entry.id === rowId) {
        return data.data;
      }
      return entry;
    });
    setDataEntry(newDataEntry);
    return newDataEntry;
  }

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
