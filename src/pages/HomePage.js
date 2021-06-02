import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PaginationBar from "../components/PaginationBar";
import PacmanLoader from "react-spinners/PacmanLoader";
import { productActions } from "../redux/actions/product.actions";
import SearchFrom from "../components/SearchForm";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { authActions } from "../redux/actions/auth.actions";

const HomePage = () => {
  const products = useSelector((state) => state.product.products);
  const totalPageNum = useSelector((state) => state.product.totalPageNum);
  const loading = useSelector((state) => state.product.loading);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();
  const [isAll, setIsAll] = useState(true);
  const [isFace, setIsFace] = useState(false);
  const [isHair, setIHair] = useState(false);
  const [isMakeUp, setIsMakeUp] = useState(false);
  const [isBody, setIsBody] = useState(false);
  const [isPerfume, setIsPerfume] = useState(false);

  let limit = 9;
  const handleClickProduct = (producId) => {
    history.push(`/product/${producId}`);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(searchInput);
  };
  useEffect(() => {
    dispatch(authActions.getCurrentUser(accessToken));
    if (name !== "") {
      dispatch(productActions.getProducts(pageNum, limit, name));
    }
    if (category !== "") {
      dispatch(productActions.getProducts(pageNum, limit, name, category));
    } else {
      dispatch(productActions.getProducts(pageNum, limit));
    }
  }, [dispatch, pageNum, limit, name, category, accessToken]);
  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="bg-image-home"></div>
        <div className="bg-text-home">
          <h1 className="nav-text"> NewAge Cosmetics </h1>
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col sm={3} style={{ marginTop: "30px" }}>
            {" "}
            <div className="stickySideMenu">
              <SearchFrom
                loading={loading}
                searchInput={searchInput}
                handleSearchChange={handleSearchInputChange}
                handleSubmit={handleSubmit}
              />
              <div
                onClick={() => {
                  setCategory("");
                  setIsAll(true);
                  setIsFace(false);
                  setIHair(false);
                  setIsMakeUp(false);
                  setIsBody(false);
                  setIsPerfume(false);
                }}
                className={!isAll ? "categoryBox" : "boxActive categorybox"}
                style={{
                  width: "90%",
                  margin: "10px",
                }}
              >
                <p
                  className=" categoryText text-center"
                  style={{ padding: "10px" }}
                >
                  All Product
                </p>{" "}
              </div>
              <div class="hr-line"></div>
              <div
                onClick={() => {
                  setCategory("facial skin care");
                  setIsAll(false);
                  setIsFace(true);
                  setIHair(false);
                  setIsMakeUp(false);
                  setIsBody(false);
                  setIsPerfume(false);
                }}
                className={!isFace ? "categoryBox" : "boxActive categorybox"}
                style={{
                  width: "90%",
                  margin: "10px",
                }}
              >
                <p
                  className="categoryText text-center"
                  style={{ padding: "10px" }}
                >
                  facial skin care
                </p>{" "}
              </div>
              <div
                className={!isHair ? "categoryBox" : "boxActive categorybox"}
                style={{ width: "90%", margin: "10px" }}
              >
                <p
                  className="categoryText text-center"
                  style={{ padding: "10px" }}
                  onClick={() => {
                    setCategory("hair care");
                    setIsAll(false);
                    setIsFace(false);
                    setIHair(true);
                    setIsMakeUp(false);
                    setIsBody(false);
                    setIsPerfume(false);
                  }}
                >
                  hair care
                </p>{" "}
              </div>
              <div
                className={!isMakeUp ? "categoryBox" : "boxActive categorybox"}
                style={{ width: "90%", margin: "10px" }}
              >
                <p
                  className="categoryText text-center"
                  style={{ padding: "10px" }}
                  onClick={() => {
                    setCategory("make up");
                    setIsAll(false);
                    setIsFace(false);
                    setIHair(false);
                    setIsMakeUp(true);
                    setIsBody(false);
                    setIsPerfume(false);
                  }}
                >
                  make up
                </p>{" "}
              </div>
              <div
                className={!isBody ? "categoryBox" : "boxActive categorybox"}
                style={{ width: "90%", margin: "10px" }}
              >
                <p
                  className="categoryText text-center"
                  style={{ padding: "10px" }}
                  onClick={() => {
                    setCategory("body care");
                    setIsAll(false);
                    setIsFace(false);
                    setIHair(false);
                    setIsMakeUp(false);
                    setIsBody(true);
                    setIsPerfume(false);
                  }}
                >
                  body care
                </p>{" "}
              </div>
              <div
                className={!isPerfume ? "categoryBox" : "boxActive categorybox"}
                style={{ width: "90%", margin: "10px" }}
              >
                <p
                  className="categoryText text-center"
                  style={{ padding: "10px" }}
                  onClick={() => {
                    setCategory("perfume");
                    setIsAll(false);
                    setIsFace(false);
                    setIHair(false);
                    setIsMakeUp(false);
                    setIsBody(false);
                    setIsPerfume(true);
                  }}
                >
                  perfume
                </p>
              </div>
            </div>
          </Col>

          <Col sm={9}>
            {loading ? (
              <PacmanLoader color="#f4fc03" size={100} margin={20} />
            ) : (
              <>
                {" "}
                <div
                  className="d-flex justify-content-around flex-wrap"
                  style={{ marginRight: "50px", marginTop: "30px" }}
                >
                  {products?.map((item) => {
                    return (
                      <Card
                        key={item?._id}
                        style={{ width: "20rem", marginTop: "30px" }}
                      >
                        <Card.Img variant="top" src={`${item?.imageUrl}`} />
                        <Card.Body>
                          <Card.Title>{item?.name}</Card.Title>
                          <Card.Text>
                            {item?.description <= 250
                              ? item.description
                              : item.description.slice(0, 220) + "......"}
                          </Card.Text>
                          <Card.Text>
                            <p>
                              {" "}
                              Old Price:{" "}
                              <span className="oldPrice">{`${item.price}đ`}</span>
                              {"  "}
                              <span style={{ color: "red" }}>
                                Now Only: {item.salePrice}đ{" "}
                              </span>{" "}
                            </p>
                          </Card.Text>
                          <div className="text-center">
                            <button
                              className="button button--calypso"
                              style={{ outline: "none" }}
                              onClick={() => handleClickProduct(item?._id)}
                            >
                              <span>Expand now</span>
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
                <PaginationBar
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                  totalPageNum={totalPageNum}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
