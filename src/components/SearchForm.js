import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const SearchForm = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <span>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col style={{ display: "flex" }}>
            <Form.Control
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchChange}
              style={{ width: "70%", marginRight: "5px" }}
            />
            {loading ? (
              <Button disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Searching..
              </Button>
            ) : (
              <Button type="submit">Search</Button>
            )}
          </Col>
        </Form.Row>
      </Form>
    </span>
  );
};

export default SearchForm;
