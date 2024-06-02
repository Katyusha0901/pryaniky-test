import Button from "@mui/material/Button";
import { useContext } from "react";
import { ChangeRowsAndAuthorizationContext } from "../ChangeRowsAndAuthorizationContextProvider";
import { HOST } from "../HostExport";

export function AddRow() {
  const { dataRows, setDataRows } = useContext(ChangeRowsAndAuthorizationContext);
  const newEntry = {
    companySigDate: "2022-12-23T11:19:27.017Z\t",
    companySignatureName: "test",
    documentName: "test",
    documentStatus: "test",
    documentType: "test",
    employeeNumber: "test",
    employeeSigDate: "2022-12-23T11:19:27.017Z\t",
    employeeSignatureName: "test",
  };
  const requestOptions: {
    method: string;
    headers: HeadersInit;
    body: BodyInit;
  } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth": `${localStorage.getItem("x-auth")}`,
    },
    body: JSON.stringify(newEntry),
  };

  return (
    <Button
      variant="contained"
      style={{ margin: "20px" }}
      onClick={() => {
        fetch(
          `${HOST}/data/v3/testmethods/docs/userdocs/create`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setDataRows([...dataRows, data.data]);
          });
      }}
    >
      Добавить запись
    </Button>
  );
}
