import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CardUpdate from "./CardUpdate";
import { AdminMiniNav } from "./AdminMiniNav";
import { Button } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AdminMen = (props) => {
  const history = useHistory();

  const URL = "http://localhost:8181/api/cards/";
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const [cardsArr, setCardsArr] = useState([]);
  const IsloggedInRedux = useSelector((state) => state.auth.loggedIn);
  const [userArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  let menCollation = cardsArr.filter((item) => {
    return item.MenCollation;
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
      <AdminMiniNav></AdminMiniNav>

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
        {menCollation.map((item, index) => {
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

                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
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
            </Fragment>
          );
        })}
      </div>
      <button
        style={{
          display: "flex",
          margin: "0 auto",
          marginTop: "10px",
        }}
        type="button"
        className="btn btn-secondary mb-2 mb-lg-0 btn-lg"
        onClick={() => history.push("/admin/CardRegister")}
      >
        Add a New Card
      </button>
    </div>
  );
};

export default AdminMen;
