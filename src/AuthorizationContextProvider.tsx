import { createContext, ReactNode, useEffect, useState } from "react";
import { TableEntry } from "./Types";
import { Navigate } from "react-router-dom";
import { RoutesObject } from "./Routes";
import { HOST } from "./HostExport";
interface ContextType {
  isLoggedIn: boolean;
  checkisLoggedIn: () => void;
  dataRows: TableEntry[];
  setDataRows: React.Dispatch<React.SetStateAction<TableEntry[]>>;
  deleteRow: (entryId: string) => void;
  changeRow: (
    rowId: string,
    data: { error_code: number; error_message: string; data: TableEntry }
  ) => TableEntry[];
  takeData: () => void;
}

export const AuthorizationContext = createContext<ContextType>({
  isLoggedIn: localStorage.getItem("x-auth") !== null,
  checkisLoggedIn: () => undefined,
  dataRows: [],
  setDataRows: () => undefined,
  deleteRow: () => undefined,
  changeRow: (rowId, data) => [],
  takeData: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AuthorizationContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(
    localStorage.getItem("x-auth") !== null
  );

  const [dataRows, setDataRows] = useState<TableEntry[]>([]);

  const authorizationContext: ContextType = {
    isLoggedIn,
    checkisLoggedIn,
    dataRows,
    setDataRows,
    deleteRow,
    changeRow,
    takeData,
  };

  function checkisLoggedIn() {
    setisLoggedIn(localStorage.getItem("x-auth") !== null);
  }

  function takeData() {
    fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": `${localStorage.getItem("x-auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataWithISOSDate: TableEntry[] = data.data.map(
          (row: TableEntry) => {
            const dateCompanySig = new Date(row.companySigDate);
            const dateEmployeeSig = new Date(row.employeeSigDate);
            const textCompanySigDate = dateCompanySig.toISOString();
            const textEmployeeSigDate = dateEmployeeSig.toISOString();
            return {
              companySigDate: textCompanySigDate,
              companySignatureName: row.companySignatureName,
              documentName: row.documentName,
              documentStatus: row.documentStatus,
              documentType: row.documentType,
              employeeNumber: row.employeeNumber,
              employeeSigDate: textEmployeeSigDate,
              employeeSignatureName: row.employeeSignatureName,
              id: row.id,
            };
          }
        );
        setDataRows(dataWithISOSDate);
      });
  }

  function deleteRow(entryId: string) {
    setDataRows(dataRows.filter((entry) => entry.id !== entryId));
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
    setDataRows(newdataRows);
    return newdataRows;
  }

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      {children}
    </AuthorizationContext.Provider>
  );
};
