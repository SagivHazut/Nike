import React, { Suspense, useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
import { ShoppingCartBox } from "./page/Basket";
import "./App.css";
import AuthGuardRoute from "./components/AuthGuardRoute";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import CardInfoPage from "./page/CardInfoPage";
import ItemPanelPage from "./page/ItemPanelPage";
import WomenStore from "./page/Women";
import MenStore from "./page/Men";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import AuthRegister from "./components/AuthRegister";
import AboutPage from "./page/Aboutpage";
import Footer from "./page/Footer";
import NikeStore from "./page/NikeStore";
import Basket from "./page/Basket";
import RestPassword from "./page/RestPass";
import ChangePass from "./page/ChangePass";
import Checkout from "./page/CheckOutPage";
import Favorite from "./page/Favorite";

const SignupPage = React.lazy(() => import("./page/SignupPage"));

function Userui() {
  const [chosenSize, setChosenSize] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);
  const [favoriteCart, setFavoriteCart] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const date = new Date();

  const addItemToShoppingCart = (item) => {
    const currentShoppingCart = [...shoppingCart];
    currentShoppingCart.push({ item, date, chosenSize });
    setShoppingCart(currentShoppingCart);
  };

  const addItemToFavoriteCart = (item) => {
    const currentFavoriteCart = [...favoriteCart];
    currentFavoriteCart.push({ item, date, chosenSize });
    setFavoriteCart(currentFavoriteCart);
  };

  const RemoveItemToFavoriteCart = (date) => {
    const removeItem = favoriteCart.filter((item) => item.date !== date);
    setFavoriteCart(removeItem);
  };

  const RemoveItemToShoppingCart = (date) => {
    const newCart = shoppingCart.filter((item) => item.date !== date);
    setShoppingCart(newCart);
  };

  const handleSizeChange = (ev) => {
    setChosenSize(ev.target.value);
  };

  const handlePay = () => {
    history.push("/nike/checkout");
  };

  useEffect(() => {
    const sizing = localStorage.getItem("chosenSize");
    setChosenSize(JSON.parse(sizing));

    const favorite = window.localStorage.getItem("favorite");
    setFavoriteCart(JSON.parse(favorite));

    const product = window.localStorage.getItem("product");
    setShoppingCart(JSON.parse(product));
  }, []);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(shoppingCart));
    window.localStorage.setItem("chosenSize", JSON.stringify(chosenSize));
    window.localStorage.setItem("favorite", JSON.stringify(favoriteCart));
  }, [shoppingCart, chosenSize, favoriteCart]);

  const handleClearBasket = () => {
    window.localStorage.removeItem("product");
    setShoppingCart([]);
  };

  return (
    <div>
      <div>
        <NavBarComponent></NavBarComponent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 1,
            m: 3,
            position: "sticky",
            top: 0,
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              ml: "auto",
              bgcolor: "white",
              borderRadius: 1,
              borderColor: "primary.main",
            }}
          >
            {shoppingCart.length === 0 ||
            location.pathname === "/nike/checkout" ? (
              ""
            ) : (
              <ShoppingCartBox
                handlePay={handlePay}
                ShoppingCart={shoppingCart}
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
                clearBasket={handleClearBasket}
                chosenSize={chosenSize}
              />
            )}
          </Box>
          <Box
            sx={{
              mr: "auto",
              bgcolor: "white",
              borderColor: "primary.main",
            }}
          >
            {favoriteCart.length === 0 ||
            location.pathname === "/nike/checkout" ? (
              ""
            ) : (
              <Favorite
                FavoriteCart={favoriteCart}
                ChosenSize={chosenSize}
                handleFavoriteButtonClick={addItemToFavoriteCart}
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToFavoriteCart}
                handleSizeChange={handleSizeChange}
              />
            )}
          </Box>
        </Box>

        <ToastContainer />
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/nike/home" />
            </Route>
            <Route path="/nike/home" component={HomePage} />
            <Route path="/nike/basket" component={Basket} />
            <Route path="/nike/changepass" component={ChangePass} />
            <Route path="/nike/resetpassword" component={RestPassword} />
            <AuthRegister path="/nike/login" component={LoginPage} />
            <AuthRegister path="/nike/signup" component={SignupPage} />

            <AuthGuardRoute
              path="/nike/checkout"
              component={Checkout}
              handleClearBasket={handleClearBasket}
            ></AuthGuardRoute>

            <Route exact path="/nike/checkout">
              <Checkout handleClearBasket={handleClearBasket} />
            </Route>

            <Route exact path="/nike/women">
              <WomenStore
                handleBuyButtonClick={addItemToShoppingCart}
                handleFavoriteButtonClick={addItemToFavoriteCart}
                handleSizeChange={handleSizeChange}
              />
            </Route>

            <Route exact path="/nike/men">
              <MenStore
                handleBuyButtonClick={addItemToShoppingCart}
                handleFavoriteButtonClick={addItemToFavoriteCart}
                handleSizeChange={handleSizeChange}
              />
            </Route>
            <Route exact path="/nike/CardsPanelPage">
              <ItemPanelPage
                handleBuyButtonClick={addItemToShoppingCart}
                handleFavoriteButtonClick={addItemToFavoriteCart}
                handleSizeChange={handleSizeChange}
                ChosenSize={chosenSize}
              />
            </Route>
            <Route path="/nike/card/:id">
              <CardInfoPage
                handleBuyButtonClick={addItemToShoppingCart}
                handleFavoriteButtonClick={addItemToFavoriteCart}
                handleSizeChange={handleSizeChange}
              />
            </Route>
            <Route path="/nike/aboutpage" component={AboutPage} />

            <Route exact path="/nike/store">
              <NikeStore
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
              />
            </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>

        <Footer></Footer>
      </div>
    </div>
  );
}

export default Userui;
