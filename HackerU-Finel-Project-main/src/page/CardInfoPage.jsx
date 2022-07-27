import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const CardInfoPage = (props) => {
  const { id } = useParams();
  const [cardArr, setCardArr] = useState([]);
  const { handleBuyButtonClick } = props;

  useEffect(() => {
    axios
      .get(`cards/card/${id}`)
      .then(({ data }) => {
        setCardArr(data);
      })

      .catch((err) => {});
  }, [id]);

  return (
    <div style={{ justifyContent: "space-between", display: "flex" }}>
      <div style={{ marginLeft: "auto", display: "flex" }}>
        <Fragment key={cardArr.index}>
          <div
            style={{
              textAlign: "center",
              width: "65%",
            }}
          >
            <h3 className="card-title">{cardArr.name}</h3>{" "}
            <p
              className="card-body "
              style={{
                width: "40%",
                margin: "0 auto",
                height: "50vh",
                fontWeight: "300",
              }}
            >
              {cardArr.description}
            </p>{" "}
            <h6 className="card-subtitle mb-2 font-bolder">${cardArr.phone}</h6>
            <div
              style={{
                justifyContent: "space-evenly",
                display: "flex",
              }}
            >
              <button
                onClick={() => {
                  handleBuyButtonClick(cardArr);
                }}
                type="button"
                class="btn btn-dark btn-lg"
              >
                <h6>Add to Cart</h6>
              </button>
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              display: "flex",
              width: "50%",
            }}
          >
            <Gallery>
              <div class="row">
                <Item
                  original={cardArr.image1}
                  thumbnail={cardArr.image1}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      alt=""
                      src={cardArr.image1}
                      style={{ margin: "1%", width: "98%", cursor: "zoom-in" }}
                    />
                  )}
                </Item>
                <Item
                  original={cardArr.image2}
                  thumbnail={cardArr.image2}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      alt=""
                      onClick={open}
                      src={cardArr.image2}
                      style={{ margin: "1%", width: "98%", cursor: "zoom-in" }}
                    />
                  )}
                </Item>
              </div>
              <div class="row">
                <Item
                  original={cardArr.image3}
                  thumbnail={cardArr.image3}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      alt=""
                      onClick={open}
                      src={cardArr.image3}
                      style={{ margin: "1%", width: "98%", cursor: "zoom-in" }}
                    />
                  )}
                </Item>{" "}
                <Item
                  original={cardArr.image}
                  thumbnail={cardArr.image}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      alt=""
                      onClick={open}
                      src={cardArr.image}
                      style={{ margin: "1%", width: "98%", cursor: "zoom-in" }}
                    />
                  )}
                </Item>
              </div>
            </Gallery>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default CardInfoPage;
