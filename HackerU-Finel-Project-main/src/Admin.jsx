import React from "react";
import transactions from "./Admin/Transactions";
import AuthGuardAdminRoute from "./Admin/AdminComponents/AuthGuardAdminRoute";
import { ToastContainer } from "react-toastify";
import AdminNavbar from "../src/Admin/AdminComponents/AdminNavbar";
import Adminlogin from "./Admin/Adminlogin";
import AdminSignupPage from "./Admin/AdminSignupPage";
import AuthRegister from "./components/AuthRegister";
import AdminCards from "./Admin/AdminCards";
import { Redirect } from "react-router-dom";
import WomenCardRegister from "./Admin/WomenCardRegister";
import AdminWomen from "./Admin/AdminWomen";
import AdminMen from "./Admin/AdminMen";
import CardUpdate from "./Admin/CardUpdate";
import CardRegister from "./Admin/CardsRegister";
import WebUsers from "./Admin/WebUsers";
const Admin = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>

      <div>
        <ToastContainer />
        <AuthGuardAdminRoute
          path="/admin/transactions"
          component={transactions}
        />
        <AuthGuardAdminRoute
          path="/admin/WebUsers"
          component={WebUsers}
        />
        <AuthGuardAdminRoute path="/admin/adminCards" component={AdminCards} />
        <Redirect to="/admin/transactions" />
        <AuthGuardAdminRoute
          path="/admin/womencardregister"
          component={WomenCardRegister}
        />
        <AuthGuardAdminRoute path="/admin/CardUpdate" component={CardUpdate} />
        <AuthGuardAdminRoute
          path="/admin/CardRegister"
          component={CardRegister}
        />
        <AuthGuardAdminRoute path="/admin/AdminMen" component={AdminMen} />
        <AuthGuardAdminRoute path="/admin/AdminWomen" component={AdminWomen} />
        <AuthRegister path="/admin/signup" component={AdminSignupPage} />
        <AuthRegister path="/admin/login" component={Adminlogin} />
      </div>
    </div>
  );
};
export default Admin;
