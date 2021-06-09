import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect,useLocation } from "react-router-dom";

const PrivetRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
    const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivetRoute;
