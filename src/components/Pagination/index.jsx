import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.scss';

function Pagination({ currentPage, onChangePage }) {
  const { numberOfPage } = useSelector((state) => state.filter);
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={numberOfPage}
      initialPage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
