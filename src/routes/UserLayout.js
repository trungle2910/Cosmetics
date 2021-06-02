import React from "react";
import { Switch, Route } from "react-router";
import UserProfilePage from "../pages/UserProfilePage";

const UserLayout = () => {
  return (
    <Switch>
      <Route exact path="/user/profile" component={UserProfilePage} />
    </Switch>
  );
};

export default UserLayout;
