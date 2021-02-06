import { useState, useEffect } from "react";
import { makeStyles, AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.css";
import "fontsource-roboto";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup/Signup";
import About from "./components/About/About";
import Students from "./components/Students/Students";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import Error404 from "./components/Error404/Error404";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link to="/" color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function App() {
  const classes = useStyles();
  let history = useHistory();

  // flag to show edit form
  const [editing, setEditing] = useState(false);

  const editRow = (student) => {
    setStudentEditProfileData({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: student.password,
    });

    setEditing(true);

    history.push("/student/" + student.id);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setStudentList(studentList.filter((student) => student.id !== id));
  };

  // signin form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // profile form data (regisration and update student functionality)
  const [signupProfileData, setSignupProfileData] = useState({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // boolean value to store signin flag
  const [loggedin, setLoggedIn] = useState(
    localStorage.getItem("loggedinAccount") != null
  );

  // name of loggedin user to be displayed on the navbar menue
  const [name, setName] = useState();

  // profile form data (regisration and update student functionality)
  const [studentProfileData, setStudentEditProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let [studentList, setStudentList] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const onSignUpSubmit = (e, formData) => {
    e.preventDefault();

    // retrieve data form LocalStorage
    const localStorateData = JSON.parse(localStorage.getItem("userData"));

    if (localStorateData) {
      for (let i = 0; i < localStorateData.length; i++) {
        if (formData.email === localStorateData[i].email) {
          alert("Already registered on this email");
          document.getElementById("email").focus();
          setLoggedIn(false);
          break;
        }
      }
    }

    alert("You have created an account!");
    const accounts = JSON.parse(localStorage.getItem("userData")) || [];
    accounts.push(formData);
    localStorage.setItem("userData", JSON.stringify(accounts));
    localStorage.setItem("loggedinAccount", JSON.stringify(formData));
    // udpate student list state
    setStudentList(accounts);
    setName(formData.firstName);
    setSignupProfileData({
      id: uuidv4(),
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setLoggedIn(true);
  };

  const onStudentEditSubmit = (e, id, updatedStudent) => {
    e.preventDefault();

    studentList = studentList.map((student) =>
      student.id === id ? updatedStudent : student
    );

    setStudentList(studentList);

    localStorage.setItem("userData", JSON.stringify(studentList));

    setEditing(false);
  };

  const onSignInSubmit = (e, formData) => {
    e.preventDefault();

    // retrieve exising localstorate data
    const localStorateData = JSON.parse(localStorage.getItem("userData"));
    let success = false;

    if (localStorateData) {
      for (let i = 0; i < localStorateData.length; i++) {
        if (
          formData.email === localStorateData[i].email &&
          formData.password === localStorateData[i].password
        ) {
          setLoggedIn(true);
          success = true;
          localStorage.setItem(
            "loggedinAccount",
            JSON.stringify(localStorateData[i])
          );
          setName(localStorateData[i].firstName);
          alert("You are loggedin");
          break;
        }
      }
    }

    if (!success) {
      alert("Incorrect email or password");
      document.getElementById("email").focus();
      setLoggedIn(false);
      return false;
    }
  };

  useEffect(() => {
    if (!editing && studentProfileData.firstName) {
      alert("You have edited the account");

      setStudentEditProfileData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setEditing(false);
      history.push("/students");
    } else if (loggedin && signupProfileData.firstName) {
      alert("You have creaated n account!");
      const accounts = JSON.parse(localStorage.getItem("userData")) || [];
      accounts.push(signupProfileData);
      localStorage.setItem("userData", JSON.stringify(accounts));
      localStorage.setItem(
        "loggedinAccount",
        JSON.stringify(signupProfileData)
      );
      // udpate student list state
      setStudentList(accounts);
      setName(signupProfileData.firstName);
      setSignupProfileData({
        id: uuidv4(),
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else if (loggedin && loginData.email) {
      localStorage.setItem("loggedinAccount", "true");
      setLoginData({
        email: "",
        password: "",
      });
    }
  }, [loggedin, editing]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between" // This will result in making second <Grid item> right aligned
            container
          >
            <Grid item>
              {
                // left aligned
              }
              <Button color="inherit">
                <Link className="btns" to="/">
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="btns" to="/about">
                  About
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="btns" to="/students">
                  Students
                </Link>
              </Button>
              {loggedin ? (
                <Button id="name" disabled>
                  {name}'s account
                </Button>
              ) : null}
            </Grid>

            <Grid item>
              {!loggedin ? (
                <>
                  <Button color="inherit">
                    <Link className="btns" to="/signup">
                      Sign Up
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link className="btns" to="/signin">
                      Log in
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => {
                    setLoggedIn(false);
                    setName("");
                    localStorage.removeItem("loggedinAccount");
                  }}
                >
                  Log out
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Home name={name} />
        </Route>
        <PrivateRoute path="/about" component={About} />

        {
          // https://stackoverflow.com/questions/49044052/pass-custom-data-to-privateroute-component-in-react
        }
        <PrivateRoute
          exact
          path="/students"
          component={Students}
          studentList={studentList}
          editRow={editRow}
          deleteUser={deleteUser}
        ></PrivateRoute>

        <PrivateRoute
          path="/student/:id"
          component={StudentDetails}
          currentStudent={studentProfileData}
          updateStudent={onStudentEditSubmit}
        ></PrivateRoute>

        <Route path="/signup">
          {!loggedin ? (
            <Signup
              currentProfile={signupProfileData}
              onSignUpSubmit={onSignUpSubmit}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/signin">
          {!loggedin ? (
            <SignIn initialFormData={loginData} onSubmit={onSignInSubmit} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        {/* <Route component={NotAuthorized} /> */}
        <Route path="/not-authorized" component={NotAuthorized} />
        {/* This is default route without path param. Everything non existing URL will be caught by this route */}
        <Route component={Error404} />
      </Switch>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default App;
