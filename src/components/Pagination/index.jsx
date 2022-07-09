import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={2}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
