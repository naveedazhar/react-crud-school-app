import { Link } from "react-router-dom";
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

  console.log(studentList);

  // // retrieve exising localstorate data
  // const localStorateData = JSON.parse(localStorage.getItem("userData"));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell colSpan={2}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell component="th" scope="row">
                {student.firstName}
              </TableCell>
              <TableCell>{student.email}</TableCell>

              <TableCell>
                <Button color="primary" variant="contained">
                  <Link
                    className="userDetailBtn"
                    to={{
                      pathname: `/students/${index}/${student.firstName}`,
                      state: student,
                      id: index,
                      editRow: () => editRow(student),
                      currentStudent: student,
                    }}
                  >
                    Edit
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button color="secondary" variant="contained">
                  {
                    // https://reactrouter.com/web/api/history
                    // locatio state useHistory
                  }
                  <Link
                    className="userDetailBtn"
                    to={{
                      pathname: `/students/${index}/${student.firstName}`,
                      state: student,
                      id: index,
                      deleteUser: deleteUser,
                    }}
                  >
                    Delete
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
