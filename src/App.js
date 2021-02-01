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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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

  // flag to show edit form
  const [editing, setEditing] = useState(false);

  const editRow = (student) => {
    setEditing(true);

    setStudentEditProfileData({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: student.password,
    });
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // boolean value to store signin flag
  const [loggedin, setLoggedIn] = useState(localStorage.getItem("loggedin"));

  // name of loggedin user to be displayed on the navbar menue
  const [name, setName] = useState(
    (JSON.parse(localStorage.getItem("loggedinAccount")) &&
      JSON.parse(localStorage.getItem("loggedinAccount")).firstName) ||
      ""
  );

  // profile form data (regisration and update student functionality)
  const [studentProfileData, setStudentEditProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [studentList, setStudentList] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    const inputs = Object.keys(e.target)
      .filter(
        (key) =>
          e.target[key].tagName === "INPUT" &&
          ["text", "password"].includes(e.target[key].type)
      )
      .map((key) => e.target[key]);

    // retrieve data form LocalStorage
    const localStorateData = JSON.parse(localStorage.getItem("userData"));

    for (const input of inputs) {
      setLoggedIn(true);
      if (!signupProfileData[input.name]) {
        setLoggedIn(false);
        alert(`Please enter all required fields`);
        document.getElementById([input.name]).focus();
        break;
      }
    }
    if (localStorateData) {
      for (let i = 0; i < localStorateData.length; i++) {
        if (signupProfileData.email === localStorateData[i].email) {
          alert("Already registered on this email");
          document.getElementById("email").focus();
          setLoggedIn(false);
          break;
        }
      }
    }
  };

  const onStudentEditSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const inputs = Object.keys(e.target)
      .filter(
        (key) =>
          e.target[key].tagName === "INPUT" &&
          ["text", "password"].includes(e.target[key].type)
      )
      .map((key) => e.target[key]);

    for (const input of inputs) {
      if (!studentProfileData[input.name]) {
        alert(`Please enter all required fields`);
        document.getElementById([input.name]).focus();
        break;
      }
    }

    // // retrieve data form LocalStorage
    // const localStorateData = JSON.parse(localStorage.getItem("userData"));

    // if (localStorateData) {
    //   for (let i = 0; i < localStorateData.length; i++) {
    //     if (studentProfileData.email === localStorateData[i].email) {
    //       alert("Already registered on this email");
    //       document.getElementById("email").focus();
    //       setLoggedIn(false);
    //       break;
    //     }
    //   }
    // }
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();

    // iterate whole form target is <form>
    const inputs = Object.keys(e.target)
      .filter(
        (key) =>
          e.target[key].tagName === "INPUT" &&
          ["text", "password"].includes(e.target[key].type)
      )
      .map((key) => e.target[key]);

    for (const input of inputs) {
      if (!loginData[input.name]) {
        setLoggedIn(false);
        alert(`Please enter your ${[input.name]}`);
        document.getElementById([input.name]).focus();
        return false;
      }
    }

    // retrieve exising localstorate data
    const localStorateData = JSON.parse(localStorage.getItem("userData"));
    let success = false;

    if (localStorateData) {
      for (let i = 0; i < localStorateData.length; i++) {
        if (
          loginData.email === localStorateData[i].email &&
          loginData.password === localStorateData[i].password
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

  const onChangeSignupProfileData = (e) => {
    // name, value from html input option such as <input>
    const { name, value } = e.target;
    // preVal contains pevious state
    setSignupProfileData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const onChangeLoginData = (e) => {
    // name, value from html input option such as <input>
    const { name, value } = e.target;
    // preVal contains pevious state
    setLoginData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const updateStudent = (id, updatedStudent) => {
    setEditing(false);

    setStudentList(
      studentList.map((user) => (user.id === id ? updatedStudent : user))
    );
  };

  useEffect(() => {
    if (loggedin && signupProfileData.firstName) {
      alert("You have created an account!");
      const accounts = JSON.parse(localStorage.getItem("userData")) || [];
      accounts.push(signupProfileData);
      localStorage.setItem("loggedin", "true");
      localStorage.setItem("userData", JSON.stringify(accounts));
      localStorage.setItem(
        "loggedinAccount",
        JSON.stringify(signupProfileData)
      );
      // udpate student list state
      setStudentList(accounts);
      setName(signupProfileData.firstName);
      setSignupProfileData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else if (loggedin && loginData.email) {
      localStorage.setItem("loggedin", "true");
      setLoginData({
        email: "",
        password: "",
      });
    }
    // else if (stdentRecordUpdated && studentProfileData.firstName) {
    //   alert("Student record updated!");
    //   const accounts = JSON.parse(localStorage.getItem("userData")) || [];
    //   accounts.push(signupProfileData);
    //   // localStorage.setItem("loggedin", "true");
    //   localStorage.setItem("userData", JSON.stringify(accounts));
    //   // localStorage.setItem(
    //   //   "loggedinAccount",
    //   //   JSON.stringify(signupProfileData)
    //   // );
    //   // setName(signupProfileData.firstName);

    //   // udpate student list state
    //   setStudentList(accounts);

    //   setStudentEditProfileData({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //   });
    // }
  }, [loggedin]);

  return (
    <Router>
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
                      localStorage.removeItem("loggedin");
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
            // editRow={editRow}
            deleteUser={deleteUser}
          ></PrivateRoute>

          <PrivateRoute
            path="/students/:userId/:firstName"
            component={StudentDetails}
            updateStudent={onStudentEditSubmit}
          />
          <Route path="/signup">
            {!loggedin ? (
              <Signup
                signupProfileData={signupProfileData}
                onChange={onChangeSignupProfileData}
                onSignUpSubmit={onSignUpSubmit}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/signin">
            {!loggedin ? (
              <SignIn
                data={loginData}
                onChange={onChangeLoginData}
                onSignInSubmit={onSignInSubmit}
              />
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
    </Router>
  );
}

export default App;
