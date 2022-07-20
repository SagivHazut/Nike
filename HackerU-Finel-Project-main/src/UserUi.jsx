import React, { Suspense } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { ShoppingCartBox } from "./page/Basket";
import "./App.css";
import AuthGuardRoute from "./components/AuthGuardRoute";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import CardInfoPage from "./page/CardInfoPage";
import CardsPanelPage from "./page/CardsPanelPage";
import WomenStore from "./page/Women";
import MenStore from "./page/Men";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import AuthRegister from "./components/AuthRegister";
import AboutPage from "./page/Aboutpage";
import Footer from "./page/Footer";
import { NikeStore } from "./page/NikeStore";
import Basket from "./page/Basket";
import RestPassword from "./page/RestPass";
import ChangePass from "./page/ChangePass";
import Checkout from "./page/CheckOutPage";

const SignupPage = React.lazy(() => import("./page/SignupPage"));

function Userui() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const date = new Date();

  const addItemToShoppingCart = (item) => {
    const currentShoppingCart = [...shoppingCart];
    currentShoppingCart.push({ item, date });
    setShoppingCart(currentShoppingCart);

    console.log(currentShoppingCart);
  };
  const RemoveItemToShoppingCart = () =>
    setShoppingCart((shoppingCart) =>
      shoppingCart.filter((shoppingCart) => {
        return shoppingCart.date !== date;
      })
    );

  // console.log(shoppingCart);

  // const RemoveItemToShoppingCart = (index) => {
  //   const remove = shoppingCart.slice(1, index);
  //   setShoppingCart(remove);
  //   console.log(remove);
  // };

  const clearShoppingCart = () => {
    history.push("/nike/checkout");
  };

  useEffect(() => {
    window.localStorage.setItem("product", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  useEffect(() => {
    const product = window.localStorage.getItem("product");
    setShoppingCart(JSON.parse(product));
  }, []);
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
                clearShoppingCart={clearShoppingCart}
                ShoppingCart={shoppingCart}
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
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
              ShoppingCart={shoppingCart}
            />

            <Route exact path="/nike/women">
              <WomenStore
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
              />
            </Route>
            <Route exact path="/nike/men">
              <MenStore
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
              />
            </Route>
            <Route exact path="/nike/CardsPanelPage">
              <CardsPanelPage
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
              />
            </Route>
            <Route path="/nike/card/:id">
              <CardInfoPage
                handleBuyButtonClick={addItemToShoppingCart}
                handleRemoveButtonClick={RemoveItemToShoppingCart}
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
