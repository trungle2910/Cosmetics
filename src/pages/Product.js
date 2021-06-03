import React from "react";
import { Container } from "react-bootstrap";
import AddEditProductPage from "./AddEditProductPage";
import AdminAllProductPage from "./AdminAllProductPage";

const Product = () => {
  console.log("product");
  return (
    <Container>
      <h1>this is product page</h1>
      <AddEditProductPage />
      <br />
      <AdminAllProductPage />
    </Container>
  );
};

export default Product;
