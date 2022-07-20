import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";

const CardInfoPage = (props) => {
  const { id } = useParams();
  const [cardArr, setCardArr] = useState([]);
  const { handleBuyButtonClick, handleRemoveButtonClick } = props;

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
              zIndex: 3,
              width: "68%",
            }}
          >
            <h5 className="card-title">{cardArr.name}</h5>{" "}
            <h5 className="card-body ">{cardArr.description}</h5>{" "}
            <h6 className="card-subtitle mb-2 font-bolder">${cardArr.phone}</h6>
            <div
              style={{
                justifyContent: "space-evenly",
                display: "flex",
              }}
            >
              <button
                style={{ width: "10%", height: "10%" }}
                type="button"
                class="btn btn-primary btn-lg"
                onClick={() => {
                  handleRemoveButtonClick();
                }}
              >
                {" "}
                <h6>Remove to Cart</h6>
              </button>
              <button
                style={{ width: "10%", height: "10%" }}
                onClick={() => {
                  handleBuyButtonClick(cardArr);
                }}
                type="button"
                class="btn btn-primary btn-lg"
              >
                <h6>Add to Cart</h6>
              </button>
            </div>
          </div>

          <div className="col" style={{ textAlign: "right", top: "0" }}>
            <div>
              <img
                src={cardArr.image}
                alt=""
                style={{ width: "48%", margin: " 1%" }}
              />
              <img
                src={cardArr.image1}
                alt=""
                style={{ width: "48%", margin: " 1%" }}
              />
            </div>
            <img
              src={cardArr.image2}
              alt=""
              style={{ width: "48%", margin: " 1%" }}
            />
            <img
              src={cardArr.image3}
              alt=""
              style={{ width: "48%", margin: " 1%" }}
            />
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default CardInfoPage;
