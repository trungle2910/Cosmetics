import React from "react";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

const PaginationNav = ({ pageNum, setPageNum, totalPageNum }) => {
  const changeCurrentPage = (num) => {
    setPageNum(num);
  };
  return (
    <div className="pagination">
      <Pagination
        currentPage={pageNum}
        totalPages={totalPageNum}
        changeCurrentPage={changeCurrentPage}
        theme="square-i"
      />
    </div>
  );
};

export default PaginationNav;
