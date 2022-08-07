import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory } from "react-router-dom";

const NikeStore = () => {
  const [cardsArr, setCardsArr] = useState([]);
  let autoFill = cardsArr.map((item) => {
    return item.name;
  });
  const [inputValue, setInputValue] = React.useState("");
  const [filter, setFilter] = React.useState(autoFill[0]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  let dataSearch = cardsArr.filter((item) => {
    return (item.name + item.description).includes(filter || Number(filter));
  });
  const ItemPage = (id) => {
    cardsArr.filter((item) => item._id !== id);
    history.push(`/nike/card/${id}`);
  };
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
      <div>
        <br />
        <Autocomplete
          style={{ width: "33%", margin: "1%" }}
          value={filter}
          onChange={(event, newValue) => {
            setFilter(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={autoFill}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search your shoes" />
          )}
        />
      </div>
      <br />
      <div className="row justify-content-center">
        {dataSearch.map((item, index) => {
          return (
            <div key={index} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <img
                  src={item.image}
                  onClick={() => {
                    ItemPage(item._id);
                  }}
                  style={{ cursor: "-webkit-grab" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">${item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default NikeStore;
