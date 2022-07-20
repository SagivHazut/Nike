import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const CardRegister = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [WomenCollation, setWomenCollation] = useState("womenCollation");

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handlePhoneChange = (ev) => {
    setPhone(ev.target.value);
  };
  const handleImageChange = (ev) => {
    setImage(ev.target.value);
  };
  const handleImageChange1 = (ev) => {
    setImage1(ev.target.value);
  };
  const handleImageChange2 = (ev) => {
    setImage2(ev.target.value);
  };
  const handleImageChange3 = (ev) => {
    setImage3(ev.target.value);
  };
  const handleWomenCollationChange = (ev) => {
    setWomenCollation(ev.target.value);
  };

  const handleSignup = (ev) => {
    ev.preventDefault();
    axios
      .post("/cards/women", {
        name,
        description,
        phone,
        image,
        image1,
        image2,
        image3,
        WomenCollation,
      })
      .then((res) => {
        history.push("/admin/AdminWomen", {
          description,
          phone,
          WomenCollation,
        });
      })
      .catch((err) => {
        toast.error(err.response.data);
        if (err.response) {
        }
      });
  };

  return (
    <div className="wrapper fadeInDown">
      <h1>Card Maker</h1>
      <div id="formContent">
        <form onSubmit={handleSignup}>
          <br />
          <div className="fadeIn first"></div>
          <br />
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              onChange={handleNameChange}
              value={name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDescription1"
              aria-describedby="DescriptionHelp"
              onChange={handleDescriptionChange}
              value={description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone1" className="form-label">
              Price
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone1"
              onChange={handlePhoneChange}
              value={phone}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">
              Image
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputImage1"
              onChange={handleImageChange}
              value={image}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">
              Image
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputImage1"
              onChange={handleImageChange1}
              value={image1}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">
              Image
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputImage1"
              onChange={handleImageChange2}
              value={image2}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">
              Image
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputImage1"
              onChange={handleImageChange3}
              value={image3}
              required
            />
          </div>
          <div className="mb-3" style={{ display: "none" }}>
            <label htmlFor="exampleInputWomenCollation" className="form-label">
              Collations
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputWomenCollation"
              onChange={(event) =>
                handleWomenCollationChange(event.target.value)
              }
              defaultValue="WomenCollation"
              placeholder="WomenCollation"
              value={WomenCollation}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger">
            Create a New Card
          </button>
        </form>

        <br />
      </div>
    </div>
  );
};

export default CardRegister;
