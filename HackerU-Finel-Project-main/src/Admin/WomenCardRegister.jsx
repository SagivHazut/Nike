import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox } from "./CheckBox";
const CardRegister = () => {
  const Sizes = [
    { name: "38", checked: false },
    { name: "39", checked: false },
    { name: "40", checked: false },
    { name: "41", checked: false },
    { name: "42", checked: false },
    { name: "43", checked: false },
    { name: "44", checked: false },
    { name: "45", checked: false },
    { name: "46", checked: false },
  ];
  const [size, setSize] = useState(Sizes);
  const updateCheckStatus = (index) => {
    setSize(
      size.map((topping, currentIndex) =>
        currentIndex === index
          ? { ...topping, checked: !topping.checked }
          : topping
      )
    );
  };

  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [WomenCollation, setWomenCollation] = useState("womenCollation");

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleSizeChange = (ev) => {
    setSize(ev.target.value);
  };
  console.log(size);

  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handlepriceChange = (ev) => {
    setprice(ev.target.value);
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
        price,
        image,
        image1,
        image2,
        image3,
        size,
        WomenCollation,
      })
      .then((res) => {
        history.push("/admin/AdminWomen", {
          description,
          price,
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
            <label htmlFor="exampleInputprice1" className="form-label">
              Price
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputprice1"
              onChange={handlepriceChange}
              value={price}
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
          <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">
              Size
            </label>
            <br />
            <div className="App">
              {size.map((size, index) => (
                <Checkbox
                  key={size.name}
                  isChecked={size.checked}
                  checkHandler={() => updateCheckStatus(index)}
                  label={size.name}
                  index={index}
                />
              ))}
            </div>
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
