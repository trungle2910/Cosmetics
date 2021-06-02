import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import PacmanLoader from "react-spinners/PacmanLoader";
import { authActions } from "../redux/actions/auth.actions";

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const currentUserData = useSelector((state) => state.auth.user);
  const allUserData = useSelector((state) => state.auth.allUser);
  // const userId = userData?._id

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone, avatarUrl } = formData;
    if (!name) {
      setShow(false);
    } else {
      dispatch(
        authActions.updatetUser({
          name,
          address,
          phone,
          avatarUrl,
          accessToken,
        })
      );
      setShow(false);
    }
  };

  useEffect(() => {
    dispatch(authActions.getCurrentUser(accessToken));
    dispatch(authActions.getAllUser());
  }, [dispatch, accessToken]);
  return (
    <>
      <Container fluid>
        {loading ? (
          <PacmanLoader color="#f4fc03" size={100} margin={20} />
        ) : (
          <>
            <Row>
              <Col sm={3} style={{ marginTop: "30px" }}>
                <div className="text-center">
                  <img
                    src={`${currentUserData?.avatarUrl}`}
                    alt=""
                    style={{
                      width: "80%",
                      borderRadius: "50%",
                    }}
                  />
                  <h1 style={{ marginTop: "7px" }}>{currentUserData?.name}</h1>
                  <h5>email: {currentUserData?.email}</h5>
                  <p>address: {currentUserData?.address}</p>
                  <p>phone: {currentUserData?.phone}</p>
                  <button
                    className="button button--calypso"
                    style={{ outline: "none" }}
                    onClick={() => setShow(true)}
                  >
                    <span>Edit Your Profile</span>
                  </button>

                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-50w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Your Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Your Adress"
                            name="address"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Your Phone Num"
                            name="phone"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Avatar URL"
                            name="avatarUrl"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button variant="success" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </Col>
              <Col sm={9} style={{ marginTop: "30px" }}>
                <h1>user</h1>
                <Table striped bordered hover variant="dark">
                  {" "}
                  <thead className="lead-table-header">
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUserData &&
                      allUserData.length > 0 &&
                      allUserData.map((user) => {
                        return (
                          <tr key={user._id}>
                            <td>
                              <img
                                src={`${user.avatarUrl}`}
                                alt=""
                                style={{
                                  height: "8vw",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminPage;
