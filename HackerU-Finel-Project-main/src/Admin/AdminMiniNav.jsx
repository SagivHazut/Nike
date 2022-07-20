import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import CardUpdate from "./CardUpdate";
import { useSelector } from "react-redux";

export const AdminMiniNav = (props) => {
  const [filter, setFilter] = useState("");
  const [cardsArr, setCardsArr] = useState([]);
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const IsloggedInRedux = useSelector((state) => state.auth.loggedIn);
  const [userArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const searchText = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  let dataSearch = cardsArr.filter((item) => {
    return (
      (item.name.toLowerCase() + item.description.toLowerCase())
        // + item.phone
        .includes(filter.toLowerCase() || Number(filter))
    );
  });

  const handleEditUser = (id) => {
    let newUser = userArr.find((item) => {
      return item._id === id;
    });

    setSelectedUser({ ...newUser });
  };

  const handleUpdateUser = (id) => {
    let newCardsArr = cardsArr.filter((item) => item._id !== id);
    setCardsArr(newCardsArr);
    axios.get("/cards/allCards").then(({ data }) => {
      setCardsArr(data);
      setSelectedUser(null);
    });
  };

  const handleDeleteCard = (id) => {
    axios.delete(`${URL}${id}`).then((res) => {
      const newCardsArr = cardsArr.filter((item) => item._id !== id);
      setCardsArr(newCardsArr);
    });
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav mr-auto">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/admin/AdminWomen"
              activeClassName="activeLink"
            >
              Women
            </NavLink>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/admin/AdminMen"
              activeClassName="activeLink"
            >
              Men
            </NavLink>
          </ul>
        </div>
      </nav>

      <TextField
        style={{ width: "33%", margin: "1%" }}
        id="demo-helper-text-misaligned-no-helper"
        label="Search"
        className=" mr-sm-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        value={filter}
        onChange={(e) => searchText(e)}
      />

      <div className="row justify-content-center" style={{ width: "100%" }}>
        {dataSearch.map((item, index) => {
          return (
            <div key={index} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <img src={item.image} className="card-img-top" alt="..." />

                <div className="card-body">
                  <div>
                    {userInfoRedux._id === item.userID &&
                    IsloggedInRedux === true &&
                    selectedUser !== null ? (
                      <CardUpdate
                        name={item.name}
                        description={item.description}
                        phone={item.phone}
                        image={item.image}
                        id={item._id}
                        onUpdateUser={handleUpdateUser}
                      ></CardUpdate>
                    ) : (
                      ""
                    )}
                  </div>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">${item.phone}</p>
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                    className="card-footer"
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleEditUser}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteCard(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
