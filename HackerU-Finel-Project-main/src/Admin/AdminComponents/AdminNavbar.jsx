import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const NavBarComponent = () => {
  const dispatch = useDispatch();
  const IsloggedInRedux = useSelector((state) => state.auth.loggedIn);

  let logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid justify-content-center ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-end me-auto mb-2 mb-lg-0">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/Admin/WebUsers"
              activeClassName="activeLink"
            >
              All Users
            </NavLink>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/Admin/transactions"
              activeClassName="activeLink"
            >
              Transactions
            </NavLink>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/Admin/adminCards"
              activeClassName="activeLink"
            >
              Store
            </NavLink>
          </ul>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav justify-content-end mb-2 mb-lg-0">
              {IsloggedInRedux === true ? (
                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/nike/home"
                      activeClassName="activeLink"
                      onClick={logout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
