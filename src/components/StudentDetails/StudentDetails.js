import React, { useState, useEffect } from "react";

import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const StudentDetails = ({ currentStudent, updateStudent }) => {
  const classes = useStyles();
  // const { firstName } = useParams();
  // const history = useHistory();
  // https://reactrouter.com/web/api/history
  // locatio state useHistory
  // const profileData = history.location.state;

  const [student, setStudent] = useState(currentStudent);

  // useEffect(() => {
  //   console.log("useEffect", currentStudent);
  //   // if (!currentStudent.name) {
  //   //   history.go("/students");
  //   // }
  //   setStudent(currentStudent);
  // }, [currentStudent]);

  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setStudent({ ...student, [name]: value });
  };

  return (
    <Container elevation={3} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Student
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => updateStudent(e, student.id, student)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                value={student.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                value={student.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={student.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={student.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Data
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {" "}
              Already have an account?
              <Link to="/signin"> Log in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default StudentDetails;
