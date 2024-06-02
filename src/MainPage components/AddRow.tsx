import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { ChangeRowsAndAuthorizationContext } from "../ChangeRowsAndAuthorizationContextProvider";
import { HOST } from "../HostExport";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export function AddRow() {
  const { dataRows, setDataRows } = useContext(
    ChangeRowsAndAuthorizationContext
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorInAddRowData, setIsErrorInAddRowData] =
    useState<boolean>(false);
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

  return isErrorInAddRowData ? (
    <Alert severity="error">This is an error.</Alert>
  ) : isLoading ? (
    <Button variant="contained" style={{ margin: "20px" }}>
      Добавить запись
      <CircularProgress color="inherit" style={{ margin: "15px" }} />
    </Button>
  ) : (
    <Button
      variant="contained"
      style={{ margin: "20px" }}
      onClick={() => {
        setIsLoading(true);

        fetch(
          `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
          requestOptions
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error_code === 0) {
              setDataRows([...dataRows, data.data]);
            } else {
              setIsErrorInAddRowData(true);
            }
          })
          .finally(() => setIsLoading(false));
      }}
    >
      Добавить запись
    </Button>
  );
}
