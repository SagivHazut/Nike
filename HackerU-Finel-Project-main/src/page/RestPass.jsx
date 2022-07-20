import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginPage.css";
import NikeLogo from "../assets/nikelogo.png";
import { useHistory } from "react-router-dom";

const ResetPass = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState(props.newPass);
  const URL = "http://localhost:8181";

  const handlePasswordOneChange = (event) => {
    setPassword(event.target.value);
  };

  let email = window.location.search.split("email=")[1];
  let array = `${URL}/updatepass?email=${email}&newPass=${password}`;

  const handleUpdate = (ev) => {
    ev.preventDefault();
    axios
      .post(`${array}`, { password })
      .then((res) => {
        history.push("/nike/home", { password });
      })

      .catch((err) => {
        toast.error(err.response.data);
        if (err.response) {
        }
      });
  };

  return (
    <form className="LoginForm" onSubmit={handleUpdate}>
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
          <h6>Change your password</h6>
          <br />
          <div className="box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordOneChange}
              required
            ></input>

            <br />
            <br />
            <br />
            <button className="btn btn-danger"> Reset your password</button>
          </div>
          <br />
        </div>
      </div>
    </form>
  );
};

export default ResetPass;
