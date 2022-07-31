import React, { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardAdminRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const [fromPage] = useState(location.pathname);
  const userInfoRedux = useSelector((state) => state.auth.userData);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true && userInfoRedux.biz === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthGuardAdminRoute;
