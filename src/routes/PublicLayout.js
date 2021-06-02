import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginRegisterPage from "../pages/LoginRegisterPage";
import ProductDetailPage from "../pages/ProductDetailPage";

const PublicLayout = () => {
  return (
    <>
      <Switch>
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginRegisterPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
