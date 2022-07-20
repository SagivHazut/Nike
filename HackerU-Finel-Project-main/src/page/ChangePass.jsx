import React from "react";
import NikeLogo from "../assets/nikelogo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const ChangePass = () => {
  const history = useHistory();
  const URL = "http://localhost:8181/resetPassword?email=";
  const [email, setEmail] = useState("");

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const Submit = async (ev) => {
    ev.preventDefault();
    axios
      .get(`${URL}${email}`, { email })
      .then((res) => {
        history.push("/nike/home", toast.success("Email sent Successfully"));
      })
      .catch((err) => {
        toast.error(err.response.data);
        if (err.response) {
        }
      });
  };
  return (
    <form className="LoginForm" onSubmit={Submit}>
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
              required
            ></input>
            <br />
            <br />
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                required
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                I agree for the terms
              </label>
            </div>
            <br />
            <br />
            <button className="btn btn-danger">Reset you password</button>
            <br />
            <br />
          </div>
          <br />
        </div>
      </div>
    </form>
  );
};

export default ChangePass;
