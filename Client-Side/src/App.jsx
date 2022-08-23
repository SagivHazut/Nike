import React, { Suspense } from "react";
import UserUi from "./UserUi";
import { Route, Redirect, Switch } from "react-router-dom";
import Admin from "./Admin";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/nike/home" />
          </Route>
          <Route path="/nike" component={UserUi} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </div>
  );
};
export default App;
