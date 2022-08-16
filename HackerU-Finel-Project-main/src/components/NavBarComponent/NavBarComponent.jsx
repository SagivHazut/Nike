import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import nikelogo from "../../assets/nikelogo.png";

const NavBarComponent = (props) => {
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
              to="/nike/home"
              activeClassName="activeLink"
            >
              <img
                src={nikelogo}
                alt="nikelogo"
                style={{ width: "30px", height: "30px" }}
              />
              Nike{" "}
            </NavLink>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/nike/aboutpage"
                activeClassName="activeLink"
              >
                About Us{" "}
              </NavLink>
            </li>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/nike/CardsPanelPage"
              activeClassName="activeLink"
            >
              Store{" "}
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
                      to="/nike/login"
                      activeClassName="activeLink"
                      onClick={logout}
                    >
                      Logout{" "}
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/nike/login"
                      activeClassName="activeLink"
                    >
                      Login{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      style={{ width: "80px" }}
                      className="nav-link"
                      aria-current="page"
                      to="/nike/signup"
                      activeClassName="activeLink"
                    >
                      Sign Up{" "}
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
