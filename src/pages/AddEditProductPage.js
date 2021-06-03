import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/product.actions";
import { authActions } from "../redux/actions/auth.actions";

const AddEditProductPage = (productId) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    category: "facial skin care",
    imageUrl: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, salePrice, category, imageUrl } =
      formData;
    if (productId.length > 5) {
      dispatch(
        productActions.editProduct({
          name,
          description,
          price,
          salePrice,
          category,
          imageUrl,
          productId: productId,
        })
      );
    } else {
      dispatch(
        productActions.newProduct({
          name,
          description,
          price,
          salePrice,
          category,
          imageUrl,
        })
      );
    }

    setShow(false);
  };
  useEffect(() => {
    dispatch(authActions.getCurrentUser(accessToken));
  }, [dispatch, accessToken]);
  return (
    <>
      {productId.length > 5 ? (
        <Button variant="outline-success" onClick={handleShow}>
          Edit Product
        </Button>
      ) : (
        <Button variant="outline-success" onClick={handleShow}>
          Add Product
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  name="name"
                  onChange={handleChange}
                  type="firstName"
                  placeholder="Enter Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Normal Price</Form.Label>
                <Form.Control
                  name="price"
                  onChange={handleChange}
                  type="lastName"
                  placeholder=" Enter price"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridEmailAddress">
              <Form.Label>Sale Price</Form.Label>
              <Form.Control
                name="salePrice"
                onChange={handleChange}
                placeholder="Enter sale Price"
              />
            </Form.Group>
            <Form.Group controlId="formGridMobile">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="imageUrl"
                onChange={handleChange}
                placeholder="Enter image Url"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Type Of Product</Form.Label>
              <Form.Control
                name="category"
                onChange={handleChange}
                as="select"
                defaultValue="facial skin care"
              >
                <option>facial skin care</option>
                <option>hair care</option>
                <option>make up</option>
                <option>body care</option>
                <option>perfume</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridAddress">
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleChange}
                placeholder="Enter description"
                style={{ height: "100px" }}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Save Change
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEditProductPage;
