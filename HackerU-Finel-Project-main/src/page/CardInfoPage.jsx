import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardActions, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RemoveShoppingCart } from "@material-ui/icons";

const CardInfoPage = (props) => {
  const { id } = useParams();
  const [cardArr, setCardArr] = useState([]);
  const { handleBuyButtonClick, handleRemoveButtonClick, item } = props;

  useEffect(() => {
    axios
      .get(`cards/card/${id}`)
      .then(({ data }) => {
        setCardArr(data);
      })

      .catch((err) => {});
  }, []);
  console.log(cardArr);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "block",
          zIndex: 3,
          width: "68%",
          position: "absolute",
        }}
      >
        <h5>{cardArr.name}</h5> <h5>{cardArr.description}</h5>{" "}
        <h6>${cardArr.phone}</h6>
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
              handleRemoveButtonClick();
            }}
          >
            <h6>Remove to Cart</h6>
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
            <h6>Add to Cart</h6>
          </IconButton>
        </CardActions>
      </div>
      <div style={{ width: "35%", marginLeft: "auto" }}>
        <Fragment key={cardArr.index}>
          <div className="col">
            <Carousel
              className="main-slide"
              interval={5000}
              showStatus={false}
              dynamicHeight={true}
              showThumbs={true}
              showArrows={true}
              showIndicator={true}
            >
              <div className="image">
                <img
                  style={{ textAlign: "center" }}
                  src={cardArr.image}
                  className="card-img-top "
                  alt="..."
                />
              </div>
              <div className="image">
                <img
                  style={{ textAlign: "center" }}
                  src={cardArr.image1}
                  className="card-img-top "
                  alt="..."
                />
              </div>
              <div className="image">
                <img
                  style={{ textAlign: "center" }}
                  src={cardArr.image2}
                  className="card-img-top "
                  alt="..."
                />
              </div>
              <div className="image">
                <img
                  style={{ textAlign: "center" }}
                  src={cardArr.image3}
                  className="card-img-top "
                  alt="..."
                />
              </div>
            </Carousel>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default CardInfoPage;
