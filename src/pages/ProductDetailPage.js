import React from "react";
import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/product.actions";
import PacmanLoader from "react-spinners/PacmanLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const savePrice = useSelector((state) => state.product.savePrice);
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const savePercent = useSelector((state) => state.product.savePercent);
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  const history = useHistory();

  let pageNum = 1;
  let limit = 5;

  const handleClickProduct = (producId) => {
    history.push(`/product/${producId}`);
  };
  useEffect(() => {
    dispatch(productActions.getSingleProduct(productId));

    let category = singleProduct?.category;
    let name = "";
    dispatch(productActions.getProducts(pageNum, limit, name, category));
  }, [dispatch, productId]);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    pauseOnHover: true,
  };
  return (
    <>
      {loading ? (
        <PacmanLoader color="#f4fc03" size={100} margin={20} />
      ) : (
        <Container style={{ marginTop: "2vw", width: "90vw" }}>
          <Row>
            <Col sm={6}>
              <img
                src={`${singleProduct?.imageUrl}`}
                alt=""
                style={{ width: "39vw" }}
              />
            </Col>
            <Col sm={6}>
              <div className="text-center">
                <h4 className="detailTitle">{singleProduct?.name}</h4>
              </div>
              <br />
              <div>
                <h6 style={{ color: "#a85032" }}>
                  Giá Bán: {singleProduct?.salePrice}đ {"  "}{" "}
                  <span> (Đã bao gồm VAT)</span>
                </h6>
              </div>
              <div>
                <p>
                  Giá hãng: {singleProduct?.price}đ -{" "}
                  <span
                    className="savePrice"
                    style={{ fontSize: "15px", color: "red" }}
                  >
                    Tiết kiệm: {savePrice}₫ (-{Math.round(savePercent)}%){" "}
                  </span>
                </p>
              </div>
              <div>
                <p>{singleProduct?.description}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <h1 className="detailTitle">
              {" "}
              Recomment for {singleProduct?.category}
            </h1>
            <Slider {...settings} style={{ width: "100%" }}>
              {products.map((item) => (
                <div
                  className="containerSlider"
                  onClick={() => handleClickProduct(item?._id)}
                >
                  <img
                    src={`${item?.imageUrl}`}
                    alt=""
                    className="imageSlider"
                  />
                  <div className="middleSlider">
                    <h3 className="textSlider">{item?.name}</h3>
                    <p style={{ fontSize: "1.5vw" }}>
                      {" "}
                      Old Price:{" "}
                      <span className="oldPrice">{`${item.price}đ`}</span>
                      {"  "}
                      <span style={{ color: "red" }}>
                        Now Only: {item.salePrice}đ{" "}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
