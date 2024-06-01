import { createContext, ReactNode, useEffect, useState } from "react";
import { TableEntry } from "./Types";

interface ContextType {
  isLoggedIn: boolean;
  isRegistration: boolean;
  checkisLoggedIn: () => void;
  checkIsRegistration: () => void;
  dataRows: TableEntry[];
  setdataRows: React.Dispatch<React.SetStateAction<TableEntry[]>>;
  deleteRow: (entryId: string) => void;
  changeRow: (
    rowId: string,
    data: { error_code: number; error_message: string; data: TableEntry }
  ) => TableEntry[];
}

export const AuthorizationContext = createContext<ContextType>({
  isLoggedIn: localStorage.getItem("x-auth") !== null,
  isRegistration: true,
  checkisLoggedIn: () => undefined,
  checkIsRegistration: () => undefined,
  dataRows: [],
  setdataRows: () => undefined,
  deleteRow: () => undefined,
  changeRow: (rowId, data) => [],
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(
    localStorage.getItem("x-auth") !== null
  );

  const [isRegistration, setIsRegistration] = useState<boolean>(
    localStorage.getItem("isRegistration") !== null
  );

  const [dataRows, setdataRows] = useState<TableEntry[]>([]);

  const authorizationContext: ContextType = {
    isLoggedIn,
    isRegistration,
    checkisLoggedIn,
    checkIsRegistration,
    dataRows,
    setdataRows,
    deleteRow,
    changeRow,
  };

  useEffect(() => {
    takeData();
  }, [isLoggedIn]);

  function checkisLoggedIn() {
    setisLoggedIn(localStorage.getItem("x-auth") !== null);
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
        setdataRows(data.data);
      });
  }

  function deleteRow(entryId: string) {
    setdataRows(dataRows.filter((entry) => entry.id !== entryId));
  }

  function changeRow(
    rowId: string,
    data: { error_code: number; error_message: string; data: TableEntry }
  ) {
    const newdataRows: TableEntry[] = dataRows.map((entry) => {
      if (entry.id === rowId) {
        return data.data;
      }
      return entry;
    });
    setdataRows(newdataRows);
    return newdataRows;
  }

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
