import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { ChangeRowsAndAuthorizationContext } from "../ChangeRowsAndAuthorizationContextProvider";
import { HOST } from "../HostExport";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  rowId: string;
}

export const ChangeRow: React.FC<Props> = ({ rowId }) => {
  const { dataRows, setDataRows, changeRow } = useContext(
    ChangeRowsAndAuthorizationContext
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return isLoading ? (
    <Button variant="contained" style={{ margin: "20px" }}>
      Изменить запись
      <CircularProgress color="inherit" style={{ margin: "15px" }} />
    </Button>
  ) : (
    <Button
      variant="contained"
      style={{ margin: "20px" }}
      onClick={() => {
        setIsLoading(true);

        fetch(
          `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${rowId}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setDataRows(changeRow(rowId, data));
          })
          .finally(() => setIsLoading(false));
      }}
    >
      Изменить запись
    </Button>
  );
};
