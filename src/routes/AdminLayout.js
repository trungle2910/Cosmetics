import React from "react";
import { Switch, Route } from "react-router";
import AdminPage from "../pages/AdminPage";
import Product from "../pages/Product";

const AdminLayout = () => {
  console.log("herer");
  return (
    <Switch>
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/admin/product" component={Product} />
    </Switch>
  );
};

export default AdminLayout;
