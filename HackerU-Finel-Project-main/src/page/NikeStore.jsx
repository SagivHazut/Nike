import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { CardActions, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { RemoveShoppingCart } from "@material-ui/icons";

export const NikeStore = (props) => {
  const [filter, setFilter] = useState("");
  const [cardsArr, setCardsArr] = useState([]);
  const { handleBuyButtonClick, handleRemoveButtonClick } = props;

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

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav mr-auto">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/nike/women"
              activeClassName="activeLink"
            >
              Women
            </NavLink>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/nike/men"
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

      <br />
      <div className="row justify-content-center">
        {dataSearch.map((item, index) => {
          return (
            <div key={index} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">${item.phone}</p>
                  <CardActions
                    disableSpacing
                    style={{
                      justifyContent: "space-between",
                      margin: "0 auto",
                      width: "50%",
                      display: "flex",
                    }}
                    color="secondary"
                  >
                    <IconButton
                      color="secondary"
                      aria-label="Add to Cart"
                      onClick={() => {
                        handleRemoveButtonClick(item);
                      }}
                    >
                      <RemoveShoppingCart />
                    </IconButton>
                    <IconButton
                      to="/nike/cart"
                      aria-label="Show cart items"
                      color="secondary"
                      className="cart"
                      onClick={() => {
                        handleBuyButtonClick(item);
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
