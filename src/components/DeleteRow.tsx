import Button from "@mui/material/Button";

interface Props {
  rowId: string;
  deleteRow: (id: string) => void;
}

export const DeleteRow: React.FC<Props> = ({ rowId, deleteRow }) => {
  //   const requestOptions: {
  //     method: string;
  //     headers: HeadersInit;
  //   } = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth": `${localStorage.getItem("x-auth")}`,
  //     },
  //   };

  return (
    <Button
      variant="contained"
      style={{ margin: "5px" }}
      onClick={() => {
        // fetch(
        //   `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${rowId}`,
        //   requestOptions
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data.error_code === 0) {
        //       deleteRow(rowId);
        //     }
        //   });
        deleteRow(rowId);
      }}
    >
      Удалить запись
    </Button>
  );
};
