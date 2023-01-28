import React from 'react';
import { myFoodListItems } from './../../util/myList';
import './Cart.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const Cart = (props) => {
  return (
    <div>
      <Modal
        isOpen={props.isCartOpen}
        onRequestClose={props.onClickCart}
        contentLabel="My dialog"
        className="myCartmodal"
        overlayClassName="myCartoverlay"
        closeTimeoutMS={200}>
        <div className="cart-container">
          {myFoodListItems.map((item, index) => {
            return (
              <div>
                <h6>Name : {item.name}</h6>
                <h6>Quantity : {item.quantity}</h6>
                <h6>Price : ₹{item.price}</h6>
                <hr></hr>
              </div>
            );
          })}
          <button className="btn btn-danger mx-4" onClick={props.onClickCart}>
            Cancel
          </button>
          <button className="btn btn-danger mx-4">Order Now</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
