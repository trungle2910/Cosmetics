import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/product.actions";
import SearchForm from "../components/SearchForm";
import PacmanLoader from "react-spinners/PacmanLoader";
import PaginationBar from "../components/PaginationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AdminAllProductPage = () => {
  const products = useSelector((state) => state.product.products);
  const totalPageNum = useSelector((state) => state.product.totalPageNum);
  const loading = useSelector((state) => state.product.loading);
  const history = useHistory();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  let limit = 9;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setName(searchInput);
  };

  useEffect(() => {
    if (name !== "") {
      dispatch(productActions.getProducts(pageNum, limit, name));
    } else {
      dispatch(productActions.getProducts(pageNum, limit));
    }
  }, [dispatch, pageNum, limit, name]);
  return (
    <div className="text-center">
      <div class="hr-line"></div>

      <SearchForm
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchInputChange}
        handleSubmit={handleSubmit}
      />
      <div class="hr-line"></div>

      {loading ? (
        <PacmanLoader color="#f4fc03" size={100} margin={20} />
      ) : (
        <>
          <Table striped bordered hover variant="info">
            {" "}
            <thead className="lead-table-header">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Decription</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`${item.imageUrl}`}
                          alt=""
                          style={{
                            height: "5vw",
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        price: {item.price}đ & sale Price: {item.salePrice}đ
                      </td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            dispatch(productActions.deleteProduct(item._id));
                          }}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete{" "}
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => history.push(`/product/${item._id}`)}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faEdit} /> Edit{" "}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </>
      )}
    </div>
  );
};

export default AdminAllProductPage;
