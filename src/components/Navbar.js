import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackToTop from "./BackToTop";
import { KeyboardArrowUp } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const adminLinks = (
    <Nav>
      <Nav.Link as={Link} to="/admin">
        <FontAwesomeIcon icon="chart-line" size="sm" /> Admin
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/product">
        Product
      </Nav.Link>

      <Nav.Link onClick={handleLogout}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" /> Logout
      </Nav.Link>
    </Nav>
  );

  const userLinks = (
    <Nav>
      <Nav.Link as={Link} to="/user/profile">
        <FontAwesomeIcon icon="chart-line" size="sm" /> Profile
      </Nav.Link>
      <Nav.Link as={Link} to="/user/order">
        Order
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" /> Logout
      </Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/login">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar style={{ backgroundColor: "#33A18F" }} expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/" className="mr-auto"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && (
            <>
              {!isAuthenticated
                ? publicLinks
                : role === "admin"
                ? adminLinks
                : userLinks}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default PublicNavbar;
