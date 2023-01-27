import React from 'react';
import CartButton from './CartButton';
import './Cart.css';

const Cart = () => {
  return (
    <div>
      <header className="header">
        <h1 className="mt-3 brand-heading">Super Meal</h1>
        <CartButton />
      </header>
    </div>
  );
};

export default Cart;
