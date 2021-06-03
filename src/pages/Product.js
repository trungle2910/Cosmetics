import React from "react";
import { Container } from "react-bootstrap";
import AddEditProductPage from "./AddEditProductPage";
import AdminAllProductPage from "./AdminAllProductPage";

const Product = () => {
  console.log("product");
  return (
    <Container style={{ width: "90vw", marginTop: "2vw" }}>
      <AddEditProductPage />
      <br />
      <AdminAllProductPage />
    </Container>
  );
};

export default Product;
