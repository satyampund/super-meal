import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';
import './CartNavBar.css';

const CartNavBar = () => {
  return (
    <div>
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="mt-3 brand-heading">Super Meal</h1>
        </Link>
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <CartButton />
        </Link>
      </header>
    </div>
  );
};

export default CartNavBar;
