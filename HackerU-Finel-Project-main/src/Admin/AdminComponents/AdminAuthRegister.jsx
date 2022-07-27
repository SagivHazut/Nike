import React, { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuthRegister = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const [fromPage] = useState(location.pathname);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn !== true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/WebUsers",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AdminAuthRegister;
