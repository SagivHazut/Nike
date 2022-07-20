import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Joi from "joi-browser";
import jwt_decode from "jwt-decode";
import loginSchema from "../validation/login.validation";
import { authActions } from "../store/auth";
import "./LoginPage.css";
import NikeLogo from "../assets/nikelogo.png";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleOnSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      dispatch(authActions.logout());
      toast.error("Email and/or password incorrect");
    } else {
      axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());
          const decoded = jwt_decode(res.data.token);
          dispatch(authActions.updateUser(decoded));
          localStorage.setItem("tokenKey", res.data.token);
          localStorage.setItem("email", JSON.stringify(email));
          if (location.state === null) {
            history.push("/nike/CardsPanelPage");
          } else {
            if (location.state.fromPage) {
              history.push(location.state.fromPage);
            } else {
              history.push("/nike/CardsPanelPage");
            }
          }
        })
        .catch((err) => {
          toast.error("Email and/or password incorrect");
          if (err.response) {
          }
          localStorage.clear();
          dispatch(authActions.logout());
        });
    }
  };

  const memoizedCallback = useCallback(() => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        if (!email || !password) {
          setEmail(location.state.email);
          setPassword(location.state.password);
        } else {
          handleOnSubmit();
        }
      }
    }
  }, [location.state, handleOnSubmit]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, email, password, memoizedCallback]);

  return (
    <form className="LoginForm" onSubmit={handleOnSubmit}>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <br />
          <div className="fadeIn first">
            <img src={NikeLogo} id="icon" alt="" />
          </div>
          <br />
          <h4>
            YOUR ACCOUNT FOR <br /> EVERYTHING NIKE
          </h4>
          <br />
          <div className="box">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              ref={emailRef}
              required
            ></input>
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            ></input>
            <br />
            <br />
            <NavLink
              className="nav-link2 "
              aria-current="page"
              to="/nike/changepass"
              activeClassName="activeLink1"
            >
              Reset your password
            </NavLink>

            <br />
            <br />
            <button className="btn btn-danger">Log In</button>
          </div>
          <br />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
