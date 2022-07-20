import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { NikeStore } from "./NikeStore";
import { CardActions, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RemoveShoppingCart } from "@material-ui/icons";
const WomenStore = (props) => {
  const [cardsArr, setCardsArr] = useState([]);
  const { handleBuyButtonClick, handleRemoveButtonClick } = props;

  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  let womenCollation = cardsArr.filter((item) => {
    return item.WomenCollation;
  });

  function itemSortHtL() {
    const parsePrice = (x) => parseFloat(x.replace(/^\$/, "")) || 0;
    const sortedStudios = cardsArr
      .slice()
      .sort((a, b) => parsePrice(b.phone) - parsePrice(a.phone));
    setCardsArr(sortedStudios);
  }
  function itemSortLtH() {
    const parsePrice = (x) => parseFloat(x.replace(/^\$/, "")) || 0;
    const sortedStudios = cardsArr
      .slice()
      .sort((a, b) => parsePrice(a.phone) - parsePrice(b.phone));
    setCardsArr(sortedStudios);
  }
  return (
    <div>
      <NikeStore></NikeStore>

      <div style={{ marginLeft: "2%" }}>
        <h4>Sort by:</h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={itemSortHtL}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            {" "}
            Price(High-Low)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={itemSortLtH}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Price(Low-High)
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-5 g-5">
        {womenCollation.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="col">
                <Carousel
                  className="main-slide"
                  interval={5000}
                  showStatus={false}
                  dynamicHeight={true}
                  showThumbs={false}
                  showArrows={false}
                  showIndicator={false}
                >
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image1}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image2}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image3}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                </Carousel>
                <div style={{ textAlign: "center" }} className="card-body ">
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {item.name}
                  </h5>

                  <h6
                    style={{ textAlign: "center" }}
                    className="card-subtitle mb-2 font-bolder"
                  >
                    ${item.phone}
                  </h6>
                </div>

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
            </Fragment>
          );
        })}
      </div>
      <br />
    </div>
  );
};

export default WomenStore;
