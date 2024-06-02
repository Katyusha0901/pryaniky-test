import Button from "@mui/material/Button";
interface Props {
  rowId: string;
  deleteRow: (id: string) => void;
}

export const DeleteRow: React.FC<Props> = ({ rowId, deleteRow }) => {
  return (
    <Button
      variant="contained"
      style={{ margin: "5px" }}
      onClick={() => {
        deleteRow(rowId);
      }}
    >
      Удалить запись
    </Button>
  );
};
