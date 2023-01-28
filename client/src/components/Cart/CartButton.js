import React from 'react';
import CartIcon from './CartIcon';
import './CartButton.css';
import { myFoodListCount } from '../../util/myList';

const CartButton = (props) => {
  return (
    <>
      <button className="button" onClick={props.onClickCart}>
        <span className="icon">
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className="badge">{myFoodListCount}</span>
      </button>
    </>
  );
};

export default CartButton;
