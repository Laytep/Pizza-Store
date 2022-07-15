import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Your cart is empty <icon>😕</icon>
      </h2>
      <p>
        You have no items in your shopping cart.
        <br />
        Let's go buy something!
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Shop now</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
