import { Route, Redirect } from "react-router-dom";

// https://stackoverflow.com/questions/49044052/pass-custom-data-to-privateroute-component-in-react

export const PrivateRoute = ({
  component: Component,
  exact,
  strict,
  path,
  ...rest
}) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (localStorage.getItem("loggedin")) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to="/not-authorized" />;
        }
      }}
    ></Route>
  );
};

export default PrivateRoute;
