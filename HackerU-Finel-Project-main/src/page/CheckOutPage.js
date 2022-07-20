import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Checkout = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const history = useHistory();
  const URL = "http://localhost:8181/payments?email=";
  const itemsPrice = shoppingCart.reduce((a, c) => a + 1 * c.item.phone, 0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("emailMessage");
  const [cartItems, setCartItems] = useState("products");
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiration, setExpiration] = useState();
  const [cvv, setCvv] = useState();

  const handleFirstName = (ev) => {
    setFirstName(ev.target.value);
  };
  const handleLastName = (ev) => {
    setLastName(ev.target.value);
  };

  const handleAddress = (ev) => {
    setAddress(ev.target.value);
  };
  const handleCountry = (ev) => {
    setCountry(ev.target.value);
  };
  const handleState = (ev) => {
    setState(ev.target.value);
  };
  const handleZip = (ev) => {
    setZip(ev.target.value);
  };
  const handleCardName = (ev) => {
    setCardName(ev.target.value);
  };
  const handleCardNumber = (ev) => {
    setCardNumber(ev.target.value);
  };
  const handleExpiration = (ev) => {
    setExpiration(ev.target.value);
  };
  const handleCvv = (ev) => {
    setCvv(ev.target.value);
  };
  const Submit = (ev) => {
    ev.preventDefault();
    axios
      .post("/transactions", {
        firstName,
        lastName,
        email,
        state,
        country,
        address,
        zip,
        cardName,
        expiration,
        cardNumber,
        cvv,
        cartItems,
      })
      .then((res) => {
        ev.preventDefault();
        axios.get(`${URL}${email}`, { email, cartItems }).then((res) => {
          history.push(
            "/nike/home",
            toast.success("Email sent Successfully"),
            clearShoppingCart()
          );
        });
      })
      .catch((err) => {
        toast.error(err.response.data);
        if (err.response) {
        }
      });
  };

  useEffect(() => {
    const products = window.localStorage.getItem("product");
    const emailMessage = window.localStorage.getItem("email");
    setShoppingCart(JSON.parse(products));
    setCartItems(JSON.parse(products));
    setEmail(JSON.parse(emailMessage));
  }, []);

  const clearShoppingCart = () => {
    window.localStorage.clear("products");
  };

  return (
    <div className="checkout " onSubmit={Submit}>
      <section className="py-5 text-center ">
        <div className="container  ">
          <div className="flex-row-reverse checkoutone ">
            <ul className="list-group mb-10 col-sticky-top ">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column ",
                  position: "sticky",
                  top: 0,
                  maxwidth: 500,
                  minWidth: 300,
                }}
              >
                <Box sx={{ mt: 1.3, ml: 4 }}>
                  <Badge badgeContent={shoppingCart.length} color="primary">
                    <h3>Cart</h3>
                  </Badge>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ maxwidth: 400 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {shoppingCart?.map((product, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <img
                                style={{
                                  textAlign: "center",
                                  width: "5vw",
                                }}
                                src={product.item.image}
                                alt="..."
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {product.item.name}
                            </TableCell>
                            <TableCell align="right">
                              ${product.item.phone}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor: "grey.400",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Total price
                        </TableCell>
                        <TableCell align="right">${itemsPrice}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </ul>
            <div className="col-md-8 order-md-1 col-sx-8 card p-2">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" novalidate="">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleFirstName}
                      value={firstName}
                      className="form-control"
                      id="lastName"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      name="lastname"
                      value={lastName}
                      onChange={handleLastName}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    name="address"
                    value={address}
                    onChange={handleAddress}
                  />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select d-block w-100"
                      id="country"
                      onChange={handleCountry}
                      value={country}
                    >
                      <option>United States</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      onChange={handleState}
                      value={state}
                      className="form-select d-block w-100"
                      id="state"
                      required
                    >
                      <option value="United States">Choose...</option>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>Arizona</option>
                      <option>Arkansas</option>
                      <option>California</option>
                      <option>Colorado</option>
                      <option>Connecticut</option>
                      <option>Delaware</option>
                      <option>Florida</option>
                      <option>Georgia</option>
                      <option>Hawaii</option>
                      <option>Idaho</option>
                      <option>Illinois</option>
                      <option>Indiana</option>
                      <option>Iowa</option>
                      <option>Kansas</option>
                      <option>Kentucky</option>
                      <option>Louisiana</option>
                      <option>Maine</option>
                      <option>Maryland</option>
                      <option>Massachusetts</option>
                      <option>Minnesota</option>
                      <option>Mississippi</option>
                      <option>Missouri</option>
                      <option>Montana</option>
                      <option>Nebraska</option>
                      <option>Nevada</option>
                      <option>New Hampshire</option>
                      <option>New Jersey</option>
                      <option>New Mexico</option>
                      <option>New York</option>
                      <option>North Carolina</option>
                      <option>North Dakota</option>
                      <option>Ohio</option>
                      <option>Oklahoma</option>
                      <option>Oregon</option>
                      <option>Pennsylvania</option>
                      <option>Rhode Island</option>
                      <option>South Carolina</option>
                      <option>South Dakota</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Utah</option>
                      <option>Vermont</option>
                      <option>Virginia</option>
                      <option>Washington</option>
                      <option>West Virginia</option>
                      <option>Wisconsin</option>
                      <option>Wyoming</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      className="form-control"
                      id="zip"
                      placeholder="Zip Code"
                      name="zip"
                      value={zip}
                      onChange={handleZip}
                    />
                  </div>
                </div>
                <hr className="mb-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="d-block my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked
                      required
                    />
                    <label className="form-check-label" htmlFor="card">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                    />

                    <label className="form-check-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder="Full name as displayed on card
                      "
                      name="card"
                      value={cardName}
                      onChange={handleCardName}
                    />

                    <br />
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      name="cardnumber"
                      value={cardNumber}
                      onChange={handleCardNumber}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      name="expiration"
                      value={expiration}
                      onChange={handleExpiration}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      CVV
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      name="CVV"
                      value={cvv}
                      onChange={handleCvv}
                    />
                  </div>
                </div>
                <hr className="mb-4" />
                <button
                  className="btn btn-dark px-4 rounded-pill"
                  type="submit"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
