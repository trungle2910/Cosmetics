import React from "react";
import { Container } from "react-bootstrap";
import AddEditProductPage from "./AddEditProductPage";

const Product = () => {
  console.log("product");
  return (
    <Container>
      <h1>this is product page</h1>
      <AddEditProductPage />
    </Container>
  );
};

export default Product;
