import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { AddRow } from "./AddRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AuthorizationContext } from "../AuthorizationContextProvider";

export function MainPage() {
  const { dataEntry } = useContext(AuthorizationContext);

  return dataEntry.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {dataEntry.map((entry) => (
            <TableRow
              key={entry.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <Button variant="contained" style={{ margin: "5px" }}>
                Изменить запись
              </Button>
              <Button variant="contained" style={{ margin: "5px" }}>
                Удалить запись
              </Button>
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
