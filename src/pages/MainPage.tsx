import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AddRow } from "../MainPage components/AddRow";
import { DeleteRow } from "../MainPage components/DeleteRow";
import { ChangeRow } from "../MainPage components/ChangeRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { ChangeRowsContext } from "../context/ChangeRowsContext";
import Alert from "@mui/material/Alert";

export function MainPage() {
  const { dataRows, deleteRow, isErrorInTableData } =
    useContext(ChangeRowsContext);

  return isErrorInTableData ? (
    <Alert severity="error">This is an error.</Alert>
  ) : dataRows.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {dataRows.map((entry) => (
            <TableRow
              key={entry.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <ChangeRow rowId={entry.id} />
              <DeleteRow rowId={entry.id} deleteRow={deleteRow} />
              <TableCell align="right">{entry.companySigDate}</TableCell>
              <TableCell align="right">{entry.companySignatureName}</TableCell>
              <TableCell align="right">{entry.documentName}</TableCell>
              <TableCell align="right">{entry.documentStatus}</TableCell>
              <TableCell align="right">{entry.documentType}</TableCell>
              <TableCell align="right">{entry.employeeNumber}</TableCell>
              <TableCell align="right">{entry.employeeSigDate}</TableCell>
              <TableCell align="right">{entry.employeeSignatureName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddRow />
    </TableContainer>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "35px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
