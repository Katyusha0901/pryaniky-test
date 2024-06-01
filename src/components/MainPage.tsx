import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableEntry } from "../Types";
import { useState } from "react";
import Button from "@mui/material/Button";
import { AddRow } from "./AddRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export function MainPage() {
  const [dataEntry, setDataEntry] = useState<TableEntry[]>([]);
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
      localStorage.setItem("data", data);
      setDataEntry(data.data);
    });

  return dataEntry.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {dataEntry.map((entry) => (
            <TableRow
              key={entry.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* {takeValue(entry).map((key) => (<TableCell align="right">{entry.key}</TableCell>))} */}
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
