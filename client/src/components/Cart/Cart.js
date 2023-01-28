import React, { useState } from 'react';
import { myFoodListItems } from './../../util/myList';
import './Cart.css';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <h1>Cart</h1>

      <button onClick={toggleModal}>Open modal</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="myCartmodal"
        overlayClassName="myCartoverlay"
        closeTimeoutMS={500}>
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
          <button className="btn btn-danger mx-4" onClick={toggleModal}>
            Cancel
          </button>
          <button className="btn btn-danger mx-4">Order Now</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
