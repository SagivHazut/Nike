import React,{ useState ,Fragment} from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CardUpdate = (props) => {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [price, setprice] = useState(props.price);
  const [image, setImage] = useState(props.image);
  const URL = "http://localhost:8181/api/cards/";
  const Sizes = [38, 39, 40, 41, 42, 43, 44];
  const [size, setSize] = useState([]);

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handlepriceChange = (ev) => {
    setprice(ev.target.value);
  };
  const handleImageChange = (ev) => {
    setImage(ev.target.value);
  };

  const handleUpdate = (ev) => {
    ev.preventDefault();
    props.onUpdateUser(
      axios
        .patch(`${URL}${props.id}`, { name, description, price, image, size })
        .then(() => {})

        .catch((err) => {
          toast.error(err.response.data);
          if (err.response) {
          }
        })
    );
  };
  const handleCheck = (event) => {
    let updatedList = [...size];
    if (event.target.size) {
      updatedList = [...size, event.target.value];
    } else {
      updatedList.splice(size.indexOf(event.target.value), 1);
    }
    setSize(updatedList);
  };

  let isChecked = (item) => size.includes(item);

  return (
    <Fragment>
      <div className="wrapper fadeInDown">
        <h1>Edit Your Item</h1>
        <div id="formContent">
          <form onSubmit={handleUpdate}>
            <br />
            <div className="fadeIn first"></div>
            <br />
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
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
              </label>
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
            <label>Sizes</label>
            <div
              className="mb-3"
              style={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <br />
              {Sizes.map((item, index) => (
                <div key={index}>
                  <br />

                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-danger btn-lg">
                Edit
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </Fragment>
  );
};

export default CardUpdate;
