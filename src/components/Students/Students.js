import "./Students.css";

import { makeStyles, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Students({ studentList, editRow, deleteUser }) {
  const classes = useStyles();

  // // retrieve exising localstorate data
  // const localStorateData = JSON.parse(localStorage.getItem("userData"));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name </TableCell>
            <TableCell>Email</TableCell>
            <TableCell colSpan={2}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell component="th" scope="row">
                {student.lastName}
              </TableCell>
              <TableCell>{student.email}</TableCell>

              <TableCell>
                <Button
                  onClick={() => editRow(student)}
                  className="userDetailBtn"
                  color="primary"
                  variant="contained"
                  text="Edit"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteUser(student.id)}
                  className="userDetailBtn"
                  color="secondary"
                  variant="contained"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
