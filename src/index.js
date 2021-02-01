import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// https://ultimatecourses.com/blog/react-router-not-found-component
// https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
// https://medium.com/dev-genius/material-ui-app-bar-7f426d551714

// either place students in state (fresh data from localStorage and updated as required) AND
// pass id only and get fresh data from localstorage (or from state)
// useHistory may not work with state
