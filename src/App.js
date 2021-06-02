import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PublicLayout from "./routes/PublicLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/Navbar";
import Notification from "./components/Notification";
import PrivateRoute from "./routes/PrivateRoute";
import AdminLayout from "./routes/AdminLayout";
import UserLayout from "./routes/UserLayout";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <Notification />
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <PrivateRoute path="/user" component={UserLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
