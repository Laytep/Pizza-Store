import React from 'react';

import styles from './NotFoundBlock.module.scss';
console.log(styles);

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing was found
        <p className={styles.description}>Ups, this page doesn’t seem to exist.</p>
      </h1>
    </div>
  );
};

export default NotFoundBlock;
