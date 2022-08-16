import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const CardInfoPage = (props) => {
  const URL = "http://localhost:8181/api/cards/card/";
  const [cardArr, setCardArr] = useState([]);
  const { id } = useParams();
  const [size, setSize] = useState([]);
  const { handleBuyButtonClick, handleSizeChange } = props;

  useEffect(() => {
    axios
      .get(`${URL}${id}`)
      .then(({ data }) => {
        setSize(data.size);
        setCardArr(data);
      })
      .catch((err) => {});
  }, [id]);

  return (
    <div style={{ justifyContent: "space-between", display: "flex" }}>
      {" "}
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
            <h6 className="card-subtitle mb-2 font-bolder">${cardArr.price}</h6>
            <div style={{ marginTop: "5%", marginBottom: "5%" }}>
              <div role="toolbar" aria-label="Toolbar with button groups">
                <div
                  className="btn-group mr-3"
                  role="group"
                  aria-label="First group"
                >
                  {" "}
                  {size.map((item, index) => {
                    return (
                      <button
                        key={index}
                        type="checkbox"
                        className="btn btn-outline-dark"
                        style={{ width: "5vw", height: "6vh", margin: "3%" }}
                        onClick={handleSizeChange}
                        value={item}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
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
                className="btn btn-dark btn-lg"
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
              <div className="row">
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
              <div className="row">
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
